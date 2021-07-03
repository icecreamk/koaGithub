const style = {
  width: "100%",
  maxWidth: "1200px",
  paddingLeft: 20,
  paddingRight: 20,
  marginLeft: "auto",
  marginRight: "auto",
};

export default ({ children, comp: Comp = 'div' }) => {
  return <Comp style={style}>{children}</Comp>;
};

