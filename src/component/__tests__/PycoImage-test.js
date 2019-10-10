import React from 'react';
import renderer from 'react-test-renderer';
import PycoImage from '../PycoImage';
import {favoriteUser} from '../../../__mock__/DummyData';

describe(`PycoImage Component`, () => {
    let props
    let styleView
    beforeEach(()=>{
        styleView = {
            width: 110, 
            height: 110, 
            marginTop: -70
          }
        props = {
            uri:  favoriteUser.user.picture,
            styleView: styleView
        }
    })

    it(`should render correctly`, () => {
        const tree = renderer.create(<PycoImage {...props}/>).toJSON()
        expect(tree).toMatchSnapshot();
    })

})