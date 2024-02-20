const Image = ({ src, alt, ...props }) => {
  return <img {...props} src={src} alt={alt} />;
};

export default Image;
