import * as React from 'react';

import { CategoryView } from '../models/Category';
import CategorySearchInput from './CategorySearchInput';

interface CategoriesProps {
  categories: CategoryView[];
  onCategoryChange: (number) => void;
};
interface CategoriesState {
  filter: string;
};

class Categories extends React.Component<CategoriesProps, CategoriesState> {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: null };
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  searchCategory(text: string){
      this.setState({filter: text});
  }

  renderSearchBox(){
      return (
        <CategorySearchInput
            placeholder="Search category"
            onEnterPress={(text) => this.searchCategory(text)} />
      );
  }

  changeCategory(category: CategoryView){
      this.props.onCategoryChange(category.id);
  }

  render() {
    const { categories } = this.props;
    const { filter } = this.state;

    const filteredCategories = categories.filter(c => {
        if(filter == null || filter.trim().length === 0) {
            return true;
        }
        return c.name.startsWith(filter.trim());
    });

    return (
      <nav>
        {this.renderSearchBox()}
        <div className="category-list list-group">
            {filteredCategories.map(c =>
                <a href="javascript:void(0)" role="button" className="list-group-item" key={c.id} onClick={() => this.changeCategory(c)}>
                    {c.name} [{c.productCount}]
                </a>
            )}
        </div>
      </nav>
    );
  }
}

export default Categories;
