import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import FavoriteView from "../FavoriteView";
import { FlatList } from 'react-native';

describe(`FavoriteView Component`, () => {
    let props
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<FavoriteView {...props} />);
      });

    it(`should render correctly`, () => {
        const tree = renderer.create(<FavoriteView {...props}/>).toJSON()
        expect(tree).toMatchSnapshot();
    })

    it(`should rendered Flatlist`, () => {
        expect(wrapper.find(FlatList)).toMatchSnapshot();
    })

    it('should check `componentDidMount()`', () => {
        const instance = wrapper.instance();
        jest.spyOn(instance, 'getProducts');
        instance.componentDidMount();
        expect(instance.getProducts).toHaveBeenCalledTimes(1);
    });
})