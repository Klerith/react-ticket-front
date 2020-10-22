import React, { useContext, useState } from 'react';
import { Row, Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';

import { SocketContext } from '../context/SocketContext';
import { useHideMenu } from '../hooks/useHideMenu';

import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Redirect, useHistory } from 'react-router-dom';


const { Title, Text } = Typography;

export const Escritorio = () => {

    useHideMenu(false);

    const [ usuario ] = useState( getUsuarioStorage() );
    const { socket } = useContext( SocketContext );
    const [ ticket, setTicket ] = useState(null)
    const history = useHistory();

    const salir = () => {
        localStorage.clear();
        history.replace('/ingresar');
    }

    const siguienteTicket = () => {
        socket.emit( 'siguiente-ticket-trabajar', usuario, ( ticket ) => {
            setTicket( ticket );
        });
    }

    if ( !usuario.agente || !usuario.escritorio ) {
        return <Redirect to="/ingresar" />
    }


    return (
        <>
            <Row>
                <Col span={ 20 }>
                    <Title level={ 2 }>{ usuario.agente }</Title>
                    <Text>Usted está trabajando en el escritorio: </Text>
                    <Text type="success"> { usuario.escritorio } </Text>
                </Col>

                <Col span={ 4 } align="right">
                    <Button
                        shape="round"
                        type="danger"
                        onClick={ salir }
                    >
                        <CloseCircleOutlined />
                        Salir
                    </Button>
                </Col>

            </Row>

            <Divider />

            {
                ticket && (
                    <Row>
                        <Col>
                            <Text>Está atendiendo el ticket número: </Text>
                            <Text 
                                style={{ fontSize: 30 }} 
                                type="danger"
                            > 
                            { ticket.numero }
                            </Text>
                        </Col>
                    </Row>
                )
            }


            <Row>
                <Col offset={ 18 } span={ 6 } align="right">
                    <Button
                        onClick={ siguienteTicket }
                        shape="round"
                        type="primary"
                    >
                        <RightOutlined />
                        Siguiente
                    </Button>
                </Col>  


            </Row>

        </>
    )
}
