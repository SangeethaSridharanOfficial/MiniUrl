import { fromJS, OrderedMap } from 'immutable';

const initState = fromJS({
    companyName : 'Company Name'
})


const urlStore = (state = initState, action) => {
    switch(action.type){
        case "INIT":
         return state;

        default:
            return state;
    }
}

export default urlStore;

