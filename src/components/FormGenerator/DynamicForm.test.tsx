import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicForm from './DynamicForm';
import formInstructions from '../../data/form_instructions.json';

test('a dynamic form', async () => {
    const job = formInstructions as Frontier.Job;
    const { sections} = job;
    const res = render(<DynamicForm sections={sections} />);
    const button = screen.getByRole('button');
    const name = screen.getByRole('textbox', { name: /name/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const experience = screen.getByRole('textbox', { name: /experience/i });
    const age = screen.getByRole('checkbox', { name: /age/i});
    const languages = screen.getByRole('listbox', { name: /languages/i });
    const workspace = screen.getByRole('checkbox', { name: /workspace/i });
    const hours =  res.container.querySelector('#hours_on_project');
    await waitFor(() => {
        fireEvent.change(name, { target: { value: 'Albert' } });
        fireEvent.change(email, { target: { value: 'mail@me.com' } });
        fireEvent.change(experience, { target: { value: 'some text' } });
        fireEvent.click(age);
        fireEvent.click(workspace);
        fireEvent.change(languages, { target: { value: 'fr' }});
        fireEvent.change(hours, { target: { value: 2 }});
        fireEvent.click(button);
    });
    await waitFor(() => {
        expect(res.container.querySelector('#success-form')).toBeVisible();
    });
    expect(name).toBeTruthy();
    expect(email).toBeTruthy();
    expect(age).toBeTruthy();
    expect(workspace).toBeTruthy();
    expect(experience).toBeTruthy();
    expect(languages).toBeTruthy();
    expect(hours).toBeTruthy();
    expect(button).toBeTruthy();
});
