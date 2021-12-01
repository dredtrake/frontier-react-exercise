import { Formik, Form } from 'formik';
import Inputs from './Inputs';
// import Alert from './Alert';

interface InitialValues {
  [key:string]: any;
};

const getInitialValues = (sections: Frontier.Section[]) => sections.reduce((initialValues: InitialValues, current) => {
  current.content.map(item => {
    switch (item.type) {
      case 'multichoice':
        initialValues[item.id] = [];
        break;
      case 'boolean':
        initialValues[item.id] = false;
        break;
      default:
        initialValues[item.id] = '';
    }
    return item;
  });
  return initialValues;
  
}, {});

const DynamicForm = ({ sections }: { sections: Frontier.Section[]}) => {
  // const [val, setVal] = useState({});
  // const onSubmit = useCallback((evt) => {
  //   evt?.preventDefault();
  //   const form = new FormData(evt.target);
  //   setVal(form);
  //   console.log('@', form);
  // }, []);
  // console.log(val);
  return (
    <Formik
      initialValues={getInitialValues(sections)}
      onSubmit={(values, actions) => {
        console.log(values, actions);
      }}
    >
      <Form>
        {sections.map(section => (
          <div key={section.id}>
            <h2>
              {section.title}
            </h2>
            <div>
              {section.content.map(item => (
                <Inputs
                  key={item.id}
                  input={item}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="form-group text-right">
          <input
            className="btn btn-success"
            type="submit"
          />
        </div>
      </Form>
    </Formik>

  );
};

export default DynamicForm;
