import styled from "@emotion/styled";


const SelectButton = ({ children, selected, onClick }) => {

 const CustomSpan = styled('span')({
    border: "1px solid #DCFE50",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "#DCFE50" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#DCFE50",
        color: "black",
      },
      width: "22%",
      //   margin: 5,
 })
  

  return (
    <CustomSpan onClick={onClick}>
      {children}
    </CustomSpan>
  );
};

export default SelectButton;