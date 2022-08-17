import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Formulario from './Formulario';

describe('O comportamento do Formulario.tsx', () => {
    test('Quando o input está vazio, o botão deve estar desabilitado', () => {
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>);
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const button = screen.getByRole('button');
        expect(input).toBeInTheDocument();
        expect(button).toBeDisabled();
    });
    
    test('Adicionar um participante caso existe um nome preenchido', () => {
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>);
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const button = screen.getByRole('button');
        fireEvent.change(input, {target: {value: 'Wesley Oliveira'}});
        fireEvent.click(button)
        expect(input).toHaveFocus();
        expect(input).toHaveValue("");
    });
    
    test('Nomes duplicados não podem adicionados a lista', () => {
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>);
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const button = screen.getByRole('button');
        fireEvent.change(input, {target: {value: 'Wesley Oliveira'}});
        fireEvent.click(button);
        fireEvent.change(input, {target: {value: 'Wesley Oliveira'}});
        fireEvent.click(button);
    
        const mensagemDeErro = screen.getByRole('alert');
        expect(mensagemDeErro.textContent).toBe('Nome duplicados não são permitidos!');
    });
    
    test('A mensagem de erro deve sumir após os timers', () => {
        jest.useFakeTimers();
        render(<RecoilRoot>
            <Formulario />
        </RecoilRoot>);
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
        const button = screen.getByRole('button');
        fireEvent.change(input, {target: {value: 'Wesley Oliveira'}});
        fireEvent.click(button);
        fireEvent.change(input, {target: {value: 'Wesley Oliveira'}});
        fireEvent.click(button);
    
        let mensagemDeErro = screen.queryByRole('alert');
        expect(mensagemDeErro).toBeInTheDocument();
        
        act(() => { jest.runAllTimers(); });
    
        mensagemDeErro = screen.queryByRole('alert');
        expect(mensagemDeErro).toBeNull();
    });
});