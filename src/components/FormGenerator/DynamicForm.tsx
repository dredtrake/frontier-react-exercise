import { useState } from 'react';
import { Formik, Form } from 'formik';
import Inputs from './Inputs';

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
  const [submited, setSubmited] = useState(false);
  return (
    !submited ? (
      <Formik
        initialValues={getInitialValues(sections)}
        onSubmit={(values, actions) => {
          setSubmited(true);
          console.log(values, actions);
        }}
      >
        <Form>
          {sections.map(section => (
            <div key={section.id}>
              <h2 className="title">
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
    ) : (
      <p id="success-form">Thanks for filling our form !</p>
    ));
}

export default DynamicForm;
