interface IImage {
  md?: string | undefined;
  xs?: string | undefined;
  style?: any;
}

const Image = ({ xs, md, style }: IImage) => {
  return (
    <picture>
      <source media="(max-width:425px)" srcSet={xs} />
      <source media="(min-width:425px)" srcSet={md} />
      <img
        src={xs}
        alt="..."
        style={{
          width: "auto",
          maxWidth: "100%",
          alignItems: "center",
          ...style,
        }}
      />
    </picture>
  );
};

export default Image;
