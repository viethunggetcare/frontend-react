import React, { PureComponent } from 'react';

import { 
  CATEGORY_MAX_LEVEL,
  getGetcareCategoryLevelList,
  getSelectedGetcareCategoryLevel,
  mapGetcareCategoryTreeToList,
} from 'utils/constants/adminGetcareCategoryConstants';

import PropTypes from 'prop-types';
import { isEqual, maxBy } from 'lodash';

import {
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import classes from './FormSelectTree.module.scss';

class FormSelectTree extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
    }
  }

  componentDidUpdate(prevProps,prevState) {
    const { selectedCategories } = this.state;
    const { value } = this.props;
    if ( !isEqual(value,prevProps.value) && !isEqual(value,selectedCategories[selectedCategories.length - 1]?.category_id) ) {
      this._updateSelectedCategories()
    }
  }

  _updateSelectedCategories = () => {
    
    const { value } = this.props;
    let newSelectedCategories = [];
    if ( value ) {
      const getcareCategoryList = mapGetcareCategoryTreeToList(this.props.getcareCategoryList);
      const loop = (l_category_id) => {
        const getcareCategory = getcareCategoryList.find( item => item.id === l_category_id );
        if ( getcareCategory ) {
          newSelectedCategories.unshift({ 
            category_id: getcareCategory.id, 
            level: getcareCategory.level,
            name: getcareCategory.name,
          });
          if ( getcareCategory.parent_id ) loop(getcareCategory.parent_id);
        }
      }
      loop(value);

      // const loop = (getcareCategories) => {
      //   let getcareCategory = getcareCategories.find( item => {
      //     if ( item.id === value ) return true;
      //     else if ( item.children_items ) {
      //       return loop(item.children_items);
      //     }
      //     return false;          
      //   })
      //   if ( getcareCategory ) newSelectedCategories.push(getcareCategory);
      //   return getcareCategory;
      // }
      // loop(getcareCategoryList);
    }
    // newSelectedCategories = newSelectedCategories.reverse().map( (item,index) => {
    //   return {
    //     category: item,
    //     level: index,
    //   }
    // });
    this.setState({ selectedCategories: [...newSelectedCategories] })
  }

  handleSelectCategory = ({category}) => {
    /**
     * @param {[{ category_id: string, level: number }]} selectedCategories category list đã được select.
     * @param {{ id: number, name: string, level: number, parent_id: number }} category category đang select.
     */
    let selectedCategories = [...this.state.selectedCategories]; // [{ category_id: string, level: number }]
    const existedCategory = selectedCategories.some( item => item.category_id === category.id );
    if ( !existedCategory ) {
      /**
      * @param {[{ id: number, name: string, level: number, parent_id: number }]} getcareCategoryList category list đã được select.
      */
      const getcareCategoryList = mapGetcareCategoryTreeToList(this.props.getcareCategoryList);
      selectedCategories = [];
      const loop = (l_category) => {
        selectedCategories.unshift({ category_id: l_category.id, name: l_category.name, level: l_category.level });
        const getcareCategory = getcareCategoryList.find( item => item.id === l_category.parent_id );
        if ( getcareCategory ) loop(getcareCategory);
      }
      loop(category);
    } 

    // let selectedCategories = [...this.state.selectedCategories];
    // if ( !category ) {
    //   selectedCategories = selectedCategories.filter( item => level > item.level);
    // } else {
    //   const categoryLevelIndex = selectedCategories.findIndex( item => item.level === level );
    //   if ( categoryLevelIndex > -1 ) {
    //     const existedCategory = selectedCategories.find( item => item.category.id === category.id );
    //     if ( !existedCategory ) {
    //       selectedCategories[categoryLevelIndex] = {
    //         ...selectedCategories[categoryLevelIndex],
    //         category: {...category}
    //       };
    //     }
    //     selectedCategories = selectedCategories.filter( item => level >= item.level);
    //   } else {
    //     selectedCategories.push({ level, category })
    //   }
    // }
    this.setState({ selectedCategories },()=>{
      const selectedCategoryLevel = maxBy(selectedCategories,'level');
      this.props.onChange && this.props.onChange(selectedCategoryLevel?.category_id);
    });
  }

  render() {
    const { getcareCategoryList } = this.props;
    const { selectedCategories } = this.state;
    const categoryMaxLevel = CATEGORY_MAX_LEVEL - 1;

    return (
        [...Array(categoryMaxLevel).keys()].map( level => {
          const categoryItemList = getGetcareCategoryLevelList({level, getcareCategoryTrees: getcareCategoryList, selectedCategories})
          const selectedGetcareCategoryLevel = getSelectedGetcareCategoryLevel({ level, selectedCategories });
          return (
            categoryItemList.length > 0 &&
            <div key={level} className={classes.FieldControl}>
                <label>
                { level ? `Danh mục ${level}` : <>Danh mục chính</> }
                </label>
                <Autocomplete
                name="parent_id"
                handleHomeEndKeys={false}
                value={selectedGetcareCategoryLevel || null}
                options={categoryItemList}
                getOptionLabel={(option) => option.name || ''}
                getOptionSelected={(option, value) => option.id === value.category_id}
                renderOption={(option) => {
                    return <div className={classes.CategoryRenderOption}>
                    {option?.name}
                    <span>{ option?.children_items?.length }</span>
                    </div>
                }}
                renderInput={(params) => (
                    <TextField
                      placeholder="Chọn..."
                      {...params}
                    />
                )}
                onChange={(e, newValue) => {
                    this.handleSelectCategory({ category: newValue })
                }}
              />
            </div>
          )
        })
    );
  }
}

FormSelectTree.propTypes = {
  getcareCategoryList: PropTypes.array,
};

FormSelectTree.defaultProps = {
  getcareCategoryList: [],
};

export default FormSelectTree;
