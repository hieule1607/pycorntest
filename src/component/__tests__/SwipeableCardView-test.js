import React from 'react';
import CustomButton from '../PycoButton';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import SwipeableCardView from '../SwipeableCardView';
import { responseData } from "../../../__mock__/DummyData";

describe(`SwipeableCardView Component`, () => {
    let props
    let dataI = responseData.results[0]
    beforeEach(()=>{
        props = {
            item: dataI
        }
    })

    it(`should render correctly`, () => {
        const tree = renderer.create(<SwipeableCardView {...props}/>).toJSON()
        expect(tree).toMatchSnapshot();
    })

    it('_setDataToView: render content at index correctly', () => {
        const wrapper = shallow(<SwipeableCardView {...props}/>);
        const instance = wrapper.instance()
        instance._onPressButton(0)
        let name = dataI.user.name
        expect(instance.state.content).toBe(name.first + ' ' + name.last)

        instance._onPressButton(1)
        expect(instance.state.content).toBe(dataI.user.email)

        instance._onPressButton(2)
        let location = dataI.user.location
        expect(instance.state.content).toBe(location.street)

        instance._onPressButton(3)
        expect(instance.state.content).toBe(dataI.user.phone)

        instance._onPressButton(4)
        expect(instance.state.content).toBe(dataI.user.password)
    })

    it('CustomButtom: check selected', () => {
        const wrapper = shallow(<SwipeableCardView {...props} />)
        const instance = wrapper.instance()
        wrapper.find(CustomButton).at(0).simulate('press')
        expect(instance.state.selectedIdx).toBe(0)

        wrapper.find(CustomButton).at(1).simulate('press')
        expect(instance.state.selectedIdx).toBe(1)

        wrapper.find(CustomButton).at(2).simulate('press')
        expect(instance.state.selectedIdx).toBe(2)

        wrapper.find(CustomButton).at(3).simulate('press')
        expect(instance.state.selectedIdx).toBe(3)

        wrapper.find(CustomButton).at(4).simulate('press')
        expect(instance.state.selectedIdx).toBe(4)
    })

    it('should call props func', () => {
        const removeCardView = jest.fn()
        const onSwipeRight = jest.fn()
        const wrapper = shallow(<SwipeableCardView {...props} removeCardView={removeCardView} onSwipeRight={onSwipeRight}/>);
        const instance = wrapper.instance()
        instance.props.removeCardView()
        expect(removeCardView).toHaveBeenCalled()

        instance.props.onSwipeRight(instance.props.item)
        expect(onSwipeRight).toHaveBeenCalled()
    })
})