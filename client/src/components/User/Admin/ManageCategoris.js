import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './ManageBrands';
import ManageWoods from './ManageWoods';;

const Managecategories = (props) => {
    return (
        <UserLayout>
            <ManageBrands  />
            <ManageWoods />
        </UserLayout>
    )
}

export default Managecategories;