import React from "react";

import Select, { components } from "react-select";
import { BiChevronDown } from "react-icons/bi";
import { FixedSizeList as List } from "react-window";

const SelectBox = (props: any) => {
  const [options, setOptions] = React.useState(props.options);
  const [selectedOption, setSelectedOption] = React.useState(
    props.selectedOption ?? null
  );

  React.useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  React.useEffect(() => {
    setSelectedOption(props.selectedOption);
  }, [props.selectedOption]);

  const handleChange = (value: any) => {
    setSelectedOption(value);
    props.setSelectedOption(value);
    props.onChange && props.onChange(value);
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <BiChevronDown color="#9F9FB5" />
      </components.DropdownIndicator>
    );
  };

  const optionHeight = 40;

  const MenuList = (props) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * optionHeight;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={optionHeight}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  return (
    <Select
      instanceId={props.id}
      isMulti={props.isMulti ? true : false}
      getOptionLabel={props.optionLabel}
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder={props.placeholder ?? ""}
      className={props.className ?? ""}
      components={{ MenuList, DropdownIndicator }}
      styles={{
        option: (provided, state) => ({
          // ...provided,
          width: "auto",
          height: optionHeight,
          backgroundColor: state.isFocused ? "#f5f8fa" : "transparent",
          color: "#656565",
          marginLeft: 5,
          marginRight: 5,
          marginTop: 3,
          marginBottom: 3,
          paddingLeft: 10,
          display: "flex",
          alignItems: "center",
          fontSize: 13,
          whiteSpace: 'nowrap',
          // border: '1px solid #e5e5e5',
          // borderRadius: 4
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: props.width ?? "auto",
          height: props.height ?? 55,
          display: "flex",
          alignItems: "center",
          borderRadius: 4,
          backgroundColor:
            props.backColor === "primary"
              ? "#f26522"
              : props.backColor === "secondary"
              ? "#282a2f"
              : "transparent",
          border: `1px solid ${props.borderColor ?? "#E5E7EB"}`,
        }),
        placeholder: () => ({
          color: "grayText",
          fontSize: 13,
          fontWeight: 400,
        }),
        indicatorSeparator: () => ({}),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: props.backColor === "transparent" ? "#656565 !important" : "",
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = "opacity 300ms";
          const color = "GrayText";
          const fontSize = 13;
          const fontWeight = 400;
          return {
            ...provided,
            opacity,
            transition,
            color,
            fontSize,
            fontWeight,
          };
        },
      }}
    />
  );
};

export default SelectBox;
