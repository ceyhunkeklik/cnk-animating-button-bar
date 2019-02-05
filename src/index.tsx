/**
 * @class ButtonBar
 */

import * as React from "react";
import { style } from "typestyle";
import classnames from "classnames";

import * as Icons from "react-icons/md";

export const MaterialDesignIcons = Icons;

const transitionTime = "0.5s";
const defaultColor = "#212121";

const styles = {
  component: style({
    padding: "20px 5px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    userSelect: "none",
    overflow: "hidden",
    $nest: {
      "& *": {
        boxSizing: "border-box",
        userSelect: "none"
      }
    }
  }),
  button: style({
    flex: 1,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    transition: `all ${transitionTime}`,
    marginRight: 10,
    $nest: {
      "&:last-child": {
        marginRight: 0
      }
    }
  }),
  buttonContent: style({
    display: "flex",
    alignItems: "center",
    margin: "0 auto",
    fontSize: 20,
    whiteSpace: "nowrap",
    transition: `all ${transitionTime}`,
    padding: "10px 0",
    borderRadius: 20,
    maxWidth: 18,
    overflow: "hidden",
    $nest: {
      "&.open": {
        maxWidth: "100%",
        padding: "10px 20px"
      }
    }
  }),
  iconWrapper: style({
    transition: `width ${transitionTime}`
  }),
  textWrapper: style({
    transition: `width ${transitionTime}`,
    display: "inline-block",
    fontSize: 14,
    overflow: "hidden",
    padding: "0 5px",
    marginLeft: -20,
    opacity: 0,
    marginBottom: 4,
    $nest: {
      "&.open": {
        opacity: 1,
        marginLeft: 10
      }
    }
  })
};

type Button = {
  icon: any;
  text: string;
  color: string;
};

interface State {
  buttons: Array<Button>;
  selectedIndex: number;
}

export type Props = {
  buttons: Array<Button>;
  onSelectionChange: Function;
  defaultIndex: number;
  enableDeselect: boolean;
};

export default class ButtonBar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      buttons: props.buttons,
      selectedIndex:
        !isNaN(props.defaultIndex) &&
        props.defaultIndex > -1 &&
        props.defaultIndex < props.buttons.length
          ? props.defaultIndex
          : -1
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.buttons !== this.props.buttons) {
      this.setState({ buttons: this.props.buttons });
    }
  }

  onButtonClick = (index: number) => {
    const self = this;
    const { selectedIndex } = self.state;

    if (selectedIndex !== index || this.props.enableDeselect) {
      const newIndex =
        selectedIndex !== index
          ? index
          : this.props.enableDeselect
          ? -1
          : selectedIndex;
      this.setState(
        {
          selectedIndex: newIndex
        },
        () => {
          if (self.props.onSelectionChange) {
            self.props.onSelectionChange(newIndex);
          }
        }
      );
    }
  };

  render() {
    const self = this;
    const { buttons, selectedIndex } = this.state;

    return (
      <div className={styles.component}>
        {buttons &&
          buttons.map((item, index) => {
            return (
              <div
                key={item.text}
                className={styles.button}
                onClick={() => {
                  self.onButtonClick(index);
                }}
                style={{
                  flexBasis:
                    selectedIndex === index
                      ? (100 / buttons.length) * 2
                      : selectedIndex > -1
                      ? (100 / buttons.length) * 0.75
                      : 100 / buttons.length
                }}
              >
                <div
                  className={classnames({
                    [styles.buttonContent]: true,
                    open: selectedIndex === index
                  })}
                  style={{
                    color:
                      selectedIndex === index && item.color
                        ? item.color
                        : defaultColor,
                    backgroundColor:
                      selectedIndex === index && item.color
                        ? item.color + "1E"
                        : "transparent"
                  }}
                >
                  <span className={styles.iconWrapper}>{item.icon}</span>
                  <span
                    className={classnames({
                      [styles.textWrapper]: true,
                      open: selectedIndex === index
                    })}
                  >
                    {item.text}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
