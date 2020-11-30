import { Fab, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Form from './Form'
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './Styles'
import api from '../../API_URL'
import StudentTable from './StudentTable'
import AlertMessage, { get } from '../../CommonCmp'

import Compress from 'compress.js';

function Attendance() {
  const [departments, setdepartments] = useState({ 'values': ['Computer Science'], 'short': ['CSE'] })
  const [sections, setsections] = useState(['A', 'B', 'C', 'D'])
  const [subjects, setsubjects] = useState([{ 'name': 'Compiler Design', 'code': 'kcs-501' }, { 'name': 'DBMS', 'code': 'Kcs-502' }, { 'name': 'web Designing', 'code': 'Kcs-052' }, { 'name': 'DAA', 'code': 'Kcs-503' }])
  const [error, seterror] = useState({ is_have: false, message: 'this is an error', type: 'error' })
  const [branch, setbranch] = useState('')
  const [section, setsection] = useState('')
  const [subject, setsubject] = useState('')

  const [images, setimages] = useState([])
  const [isuploading, setisuploading] = useState(false)
  const [fetched, setfetched] = useState([])
  const [loading, setloading] = useState(false)



  useEffect(() => {
    setfetched([])
    return () => {

    }
  }, [branch, section])



  const FileChanged = (e) => {

    var temp = e.target.files
    setimages(temp)

  }

  const upload = async () => {
    setisuploading(true)
    console.log(branch + section);
    var FD = new FormData()
    FD.append('token', localStorage.token)
    FD.append('class', branch + '-' + section)
    const compress= new Compress();
      for(var i=0;i<images.length;i++)
      {
        
        
        const name=images[i].name
        const data=await compress.compress([images[i]], {
          size: 10, // the max size in MB, defaults to 2MB
          quality: .75, // the quality of the image, max is 1,
          maxWidth: 1920, // the max width of the output image, defaults to 1920px
          maxHeight: 1920, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        })
          
          const img1 = data[0]
          const base64str = img1.data
          const imgExt = img1.ext
          
          const d = Compress.convertBase64ToFile(base64str, imgExt)
          const  file = new File([d],name,{ type: d.type });
          
          FD.append('userPhoto', file, file.name);
        

      }

    const res = await fetch(api + '/recognize', { method: 'POST', body: FD })
      .then(res => res.json())
    console.log(res);
    if (res.status) {

      checkduplicates(res.data)
      setimages([])

    }

    setisuploading(false)



  }

  const oncheckbox = (uid) => {

    var index = fetched.findIndex((stud) => {
      return stud.uid === uid
    })

    const stud = Object.assign({}, fetched[index])
    stud.present = !stud.present

    const total_stud = Object.assign([], fetched)
    total_stud[index] = stud
    setfetched(total_stud)



  }

  const checkduplicates = (data) => {
    var nonduplicate = []
    var newresult = []


    data.map(stud => {
      var f = fetched.findIndex((st) => {
        return st.uid === stud.uid
      })
      console.log(f);
      if (f == -1) {

        nonduplicate.push(stud)
        setfetched(fetched.concat(nonduplicate));
      }
      else if (stud.present != fetched[f].present && !fetched[f].present) {

        // oncheckbox(stud.uid)
        newresult.push(stud)
        setfetched(newresult)
      }
      else {
        newresult.push(fetched[f])
        setfetched(newresult)
      }

    })


  }

  //for uploading student attendance
  const uploadattendance = async() => {
    var data = {
      stud_class: branch + '-' + section,
      subject: subject,
      stud_data: fetched,
      token: localStorage.token
    }

    setloading(true)
    
    const res=await get('/markattendance',data);
    if(res) on_data(res);


  }

  const on_data = (data) => {
    setloading(false)
    if (data.status) {
      setloading(false)
      setbranch('')
      setsection('')
      setsubject('')
      seterror({ message: 'Attendance Marked', is_have: true, type: 'success' })
    }
    else {
      //logged out redirect to login page
    }
  }

  const classes = useStyles()
  return (
    <Grid container >
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item container xs={12} >
        <AlertMessage error={error.is_have} type={error.type} seterror={seterror} message={error.message} />
        <Form
          departments={departments}
          sections={sections}
          subjects={subjects}

          branch={branch}
          setbranch={setbranch}

          section={section}
          setsection={setsection}

          subject={subject}
          setsubject={setsubject}



        />


        {/*displaying stud table*/}
        <StudentTable
          fetched={fetched}
          oncheckbox={oncheckbox}
          isuploading={isuploading}
          uploadattendance={uploadattendance}
          isloading={loading} />


      </Grid>

      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={FileChanged}
      />




      {
        //disable upload button if no file is selected
        images.length ? <Fab disabled={isuploading} onClick={upload} className={classes.upload} component="span">
          <CheckIcon />
        </Fab> : ''
      }

      <label htmlFor="contained-button-file">
        {branch && section && subject ? <Fab disabled={isuploading} color="primary" className={classes.fab} component="span">
          <AddIcon />
        </Fab> : ''
        }
      </label>


    </Grid>
  )
}

export default Attendance
