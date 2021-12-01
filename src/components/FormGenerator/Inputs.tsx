import { Field } from 'formik';

const Label = ({ htmlFor, children }: { htmlFor : string, children: string }) =>
  <label htmlFor={htmlFor}>{children}</label>;

const Select = (props: Frontier.InputElement) => {
  const { options, ...otherProps} = props;
  return (
    <Field
      component="select"
      {...otherProps}
    >
      {options?.map(({ label, value }: { label: string, value: string }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </Field>
  );
};

const Inputs = ({
    input: { id, metadata: { format, ...otherMeta }, question_text, type },
  }
  : { input: Frontier.Element }) => {
  const GetInput = ({ type }: { type: string}) => {
    switch (type) {
      case 'boolean':
        return <Field id={id} name={id} type="checkbox" />;
        case 'text':
          return <Field id={id} name={id} type={format} {...otherMeta} />;
        case 'textarea':
          return <Field id={id} name={id} as="textarea" {...otherMeta} />;
      case 'multichoice':
        return <Select id={id} name={id} multiple size={5} {...otherMeta} />;
      default:
        return null;
    }
  }

  return (
    <div className="form-group">
        <Label htmlFor={id}>{question_text}</Label>
        <GetInput type={type} />
    </div>);
};


export default Inputs;
