import formInstructions from '../data/form_instructions.json';
import DynamicForm from './FormGenerator/DynamicForm';

function App() {
  const job = formInstructions as Frontier.Job;

  // Check your console to see the full instructions!
  console.log(job);
  const { sections, theme } = job;

  return (
    <div 
      className="main-wrapper"
      style={{
        backgroundColor: theme.background_color,
        color: theme.text_color,
      }}
    >
      <DynamicForm sections={sections} />
    </div>
  );
}

export default App;
