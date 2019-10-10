import React from 'react';
import renderer from 'react-test-renderer';
import PycoButton from "../PycoButton";

describe(`PycoButton Component`, () => {
    let props
    beforeEach(()=>{
        props = {
            iconName: 'lock', 
            isSelected: 4
        }
    })

    it(`should render correctly`, () => {
        const tree = renderer.create(<PycoButton {...props}/>).toJSON()
        expect(tree).toMatchSnapshot();
    })

})