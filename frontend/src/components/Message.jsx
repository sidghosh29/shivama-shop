import { Alert } from "react-bootstrap";

const Message = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

// Instead of below, we can set default props in the function parameter itself
// Message.defaultProps = {
//   variant: "info",
// };

export default Message;
