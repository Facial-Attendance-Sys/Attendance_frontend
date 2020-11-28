import { Grid, MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import useStyles from './Styles'

function Form(props) {
    const classes=useStyles()
    return (
        <>
            <Grid className={classes.field} item xs={12} lg={3}>
            <TextField
                id="branch"
                select
            
                variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                label="Branch"
                name="section"
                value={props.branch}
                onChange={(e)=>props.setbranch(e.target.value)}
                
                >
                {props.departments.values.map((option,index) => (
                    <MenuItem key={option} value={props.departments.short[index]}>
                    {option}
                    </MenuItem>
                ))}
        </TextField>
        </Grid>
        <Grid className={classes.field} item xs={12} lg={3}>
            <TextField
                id="section"
                select
                
                variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                label="Section"
                name="section"
                value={props.section}
                onChange={(e)=>props.setsection(e.target.value)}
                
                >
                {props.sections.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
        </TextField>
        </Grid>

        <Grid className={classes.field} item xs={12} lg={3}>
            <TextField
                id="subject"
                select
                
                variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                label="subject"
                name="subject"
                value={props.subject}
                onChange={(e)=>props.setsubject(e.target.value)}
                
                >
                {props.subjects.map((option) => (
                    <MenuItem key={option.code} value={option.code+' '+option.name}>
                    {option.code+' '+option.name}
                    </MenuItem>
                ))}
        </TextField>
        </Grid>
        </>
    )
}

export default Form
