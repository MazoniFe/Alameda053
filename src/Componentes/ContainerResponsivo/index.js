import React from 'react';
import Container from 'react-bootstrap/Container';

const ContainerResponsivo = ({ children }) => {
  const estiloContainer = {
    width: '100%', // Defina o tamanho desejado, como 80% da largura da tela
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  return (
    <Container style={estiloContainer} fluid>
      {children}
    </Container>
  );
};

export default ContainerResponsivo;