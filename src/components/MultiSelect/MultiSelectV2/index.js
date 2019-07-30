import cx from 'classnames';
import React from 'react';
import Downshift from 'downshift';
import invariant from 'invariant';
import isEqual from 'lodash.isequal';
import { settings } from 'carbon-components';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';
import { Tooltip } from "carbon-components-react";
import ListBox from "carbon-components-react/es/components/ListBox";
import Checkbox from "carbon-components-react/es/components/Checkbox";
import Selection from './Selection';
import "../styles.scss";

const { prefix } = settings;

const defaultCompareItems = (itemA, itemB, { locale }) =>
  itemA.localeCompare(itemB, locale, {
    numeric: true,
  });

/**
 * Default sorting algorithm for options in a selection control
 */
const defaultSortItems = (
  items,
  { selectedItems = [], itemToString, compareItems, locale = 'en' }
) =>
  items.sort((itemA, itemB) => {
    const hasItemA = selectedItems.includes(itemA);
    const hasItemB = selectedItems.includes(itemB);

    // Prefer whichever item is in the `selectedItems` array first
    if (hasItemA && !hasItemB) {
      return -1;
    }

    if (hasItemB && !hasItemA) {
      return 1;
    }

    return compareItems(itemToString(itemA), itemToString(itemB), {
      locale,
    });
  });

const itemToString = item => {
  invariant(
    typeof item.label === 'string',
    '[MultiSelect] the default `itemToString` method expected to receive ' +
      'an item with a `label` field of type `string`. Instead received: `%s`',
    typeof item.label
  );
  return item.label || '';
};

const defaultItemToString = item => {
  if (Array.isArray(item)) {
    return item.map(itemToString);
  }
  return itemToString(item);
};

const noop = () => undefined;

export default class MultiSelectV2 extends React.Component {
  static getDerivedStateFromProps({ open }, state) {
    /**
     * programmatically control this `open` prop
     */
    const { prevOpen } = state;
    return prevOpen === open
      ? null
      : {
          isOpen: open,
          prevOpen: open,
        };
  }

  static defaultProps = {
    compareItems: defaultCompareItems,
    disabled: false,
    locale: 'en',
    itemToString: defaultItemToString,
    initialSelectedItems: [],
    sortItems: defaultSortItems,
    type: 'default',
    light: false,
    title: false,
    open: false,
    selectionFeedback: 'top-after-reopen',
    tooltipClassName: "multi-select__tooltip"
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: props.open,
      topItems: [],
    };
  }

  handleOnChange = changes => {
    if (this.props.onChange) {
      this.props.onChange(changes);
    }
  };

  handleOnOuterClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleOnStateChange = (changes, downshift) => {
    if (changes.isOpen && !this.state.isOpen) {
      this.setState({ topItems: downshift.selectedItem });
    }

    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
        break;
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.mouseUp:
        this.setState({ isOpen: false });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.setState(() => {
          let nextIsOpen = changes.isOpen || false;

          if (changes.isOpen === false) {
            // If Downshift is trying to close the menu, but we know the input
            // is the active element in the document, then keep the menu open
            if (this.inputNode === document.activeElement) {
              nextIsOpen = true;
            }
          }

          return {
            isOpen: nextIsOpen,
          };
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { highlightedIndex, isOpen } = this.state;
    const {
      ariaLabel,
      className: containerClassName,
      id,
      items,
      itemToString,
      titleText,
      helperText,
      label,
      type,
      key,
      tooltipClassName,
      tooltipContent,
      tooltipProps,
      disabled,
      initialSelectedItems,
      selectedItems,
      sortItems,
      compareItems,
      light,
      invalid,
      invalidText,
      useTitleInItem,
      translateWithId,
    } = this.props;
    const inline = type === 'inline';
    const wrapperClasses = cx(
      `${prefix}--multi-select__wrapper`,
      `${prefix}--list-box__wrapper`,
      {
        [`${prefix}--multi-select__wrapper--inline`]: inline,
        [`${prefix}--list-box__wrapper--inline`]: inline,
        [`${prefix}--multi-select__wrapper--inline--invalid`]:
          inline && invalid,
        [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
      }
    );
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const title = titleText ? (
      <label htmlFor={id} className={titleClasses}>
        {titleText}
      </label>
    ) : null;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const helper = helperText ? (
      <div className={helperClasses}>{helperText}</div>
    ) : null;

    const input = (
      <Selection
        disabled={disabled}
        onChange={this.handleOnChange}
        initialSelectedItems={initialSelectedItems}
        selectedItems={selectedItems}
        render={({ selectedItems, onItemChange, clearSelection }) => (
          <Downshift
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            itemToString={itemToString}
            onChange={onItemChange}
            onStateChange={this.handleOnStateChange}
            onOuterClick={this.handleOnOuterClick}
            selectedItem={selectedItems}
          >
            {({
              getRootProps,
              selectedItem,
              isOpen,
              itemToString,
              highlightedIndex,
              getItemProps,
              getToggleButtonProps,
            }) => {
              const className = cx(
                `${prefix}--multi-select`,
                containerClassName,
                {
                  [`${prefix}--multi-select--invalid`]: invalid,
                  [`${prefix}--multi-select--inline`]: inline,
                  [`${prefix}--multi-select--selected`]:
                    selectedItem.length > 0,
                }
              );
              return (
                <ListBox
                  id={id}
                  type={type}
                  className={className}
                  disabled={disabled}
                  light={light}
                  invalid={invalid}
                  invalidText={invalidText}
                  isOpen={isOpen}
                  {...getRootProps({ refKey: 'innerRef' })}>
                  {invalid && (
                    <WarningFilled16
                      className={`${prefix}--list-box__invalid-icon`}
                    />
                  )}
                  <ListBox.Field
                    id={id}
                    tabIndex="0"
                    {...getToggleButtonProps({ disabled })}>
                    {selectedItem.length > 0 && (
                      <ListBox.Selection
                        clearSelection={!disabled ? clearSelection : noop}
                        selectionCount={selectedItem.length}
                      />
                    )}
                    <span className={`${prefix}--list-box__label`}>
                      {label}
                    </span>
                    <ListBox.MenuIcon
                      isOpen={isOpen}
                      translateWithId={translateWithId}
                    />
                  </ListBox.Field>
                  {isOpen && (
                    <ListBox.Menu aria-label={ariaLabel} id={id}>
                      {sortItems(items, {
                        selectedItems: {
                          top: selectedItems,
                          fixed: [],
                          'top-after-reopen': this.state.topItems,
                        }[this.props.selectionFeedback],
                        itemToString,
                        compareItems,
                        locale: 'en',
                      }).map((item, index) => {
                        const itemProps = getItemProps({ item });
                        const itemText = itemToString(item);
                        const isChecked =
                          selectedItem.filter(selected =>
                            isEqual(selected, item)
                          ).length > 0;
                        return (
                          <ListBox.MenuItem
                            key={itemProps.id}
                            isActive={isChecked}
                            isHighlighted={highlightedIndex === index}
                            {...itemProps}>
                            <Checkbox
                              id={`${itemProps.id}__checkbox`}
                              title={useTitleInItem ? itemText : null}
                              name={itemText}
                              checked={isChecked}
                              disabled={disabled}
                              readOnly={true}
                              tabIndex="-1"
                              labelText={itemText}
                            />
                          </ListBox.MenuItem>
                        );
                      })}
                    </ListBox.Menu>
                  )}
                </ListBox>
              );
            }}
          </Downshift>
        )}
      />
    );

    return (
      <div key={key} className="multi-select">
        <div className={wrapperClasses}>
          {title}
          {!inline && helper}
          {input}
        </div>
        {tooltipContent && (
          <div className={tooltipClassName}>
            <Tooltip {...tooltipProps}>
              {tooltipContent}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
}