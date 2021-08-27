import TextField from '@material-ui/core/TextField';

export default function InputField({ id, name, value, onChange, ...rest }) {
  return (
    <TextField
      variant="outlined"
      autoFocus
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      label={name}
      {...rest}
    />
  );
}
