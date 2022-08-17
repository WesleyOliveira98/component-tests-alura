import { render, screen } from '@testing-library/react';
import React from 'react';
import Formulario from './Formulario';

test('Quando o input está vazio, o botão deve estar desabilitado', () => {
    render(<Formulario />)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
    const button = screen.getByRole('button');
    expect(input).toBeInTheDocument();
    expect(button).toBeDisabled();
})