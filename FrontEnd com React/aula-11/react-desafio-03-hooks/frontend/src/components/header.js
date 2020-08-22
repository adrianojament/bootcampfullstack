import React from 'react';

// Dessa forma recebe o conteudo entre a tag. <Header>|Conteudo|<Header>
export default function Header({ children }) {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{children}</h1>
    </div>
  );
}
