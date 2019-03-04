import React, {Component}  from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CollapseRadio extends Component {
    state = {
        open: false,
        value: "0"
    }
    componentDidMount(){
        if(this.props.initState){
            this.setState({
                open: this.props.initState
            
            })
        }
    }
    handleClick = () => {
        this.setState({open: !this.state.open})
    }
    handleAngle = () => (
            this.state.open ? 
            <FontAwesomeIcon 
                icon={faAngleUp} 
                className="icon"/>
            :
            <FontAwesomeIcon 
                icon={faAngleDown} 
                className="icon"/>
    )
    handleChange = (e) => {
        this.props.handleFilters(e.target.value);
        this.setState({
            value: e.target.value
        })
    }

    renderList = () => (
        this.props.list ? 
            this.props.list.map((value) => (
                <FormControlLabel
                    key={value._id}
                    value={`${value._id}`} 
                    control={<Radio />}
                    label={value.name}/>
            ))
            : null
    )
    render(){
        return (
            <div>
                <List style={{ borderBottom: '1px solid #dbdbdb '}}>
                    <ListItem onClick={this.handleClick} >
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {/* <ListItemText primary={value.name} /> */}
                            <RadioGroup
                                arial-label="prices"
                                name="price"
                                value={this.state.value}
                                onChange={(e) => this.handleChange(e)}>
                                    {this.renderList()}
                            </RadioGroup>

                        </List>
                    </Collapse>
                </List>

            </div>
        )
    }
}
export default CollapseRadio;