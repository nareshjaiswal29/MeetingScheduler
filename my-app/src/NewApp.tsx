import React from 'react'
import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Grid, makeStyles } from '@material-ui/core'
 
  export default class NewApp extends React.Component<{}> {
    state = {
        val:[],
        show: false
    };

    render() {
        return(
          
            <div className="App">
                <AppBar>
                      <Typography variant="h5" align="center">Meeting Scheduler</Typography>
                </AppBar>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
        editable={true}
        selectable={true}
        select={this.handleDateSelect}
        events={this.state.val}
        eventContent={this.renderEventContent}
        
      />
    </div>
    )
    }


     handleDateSelect = (selectInfo: DateSelectArg) => {
        let title = prompt('Please enter the meeting title')
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() 
      
        if (title) {
          calendarApi.addEvent({
            //id: 1,
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
          this.handleSubmit(selectInfo,title)
        }
      }

       handleSubmit = (event:any, title:any) => {
        const data = {
          title: title,
          start: event.startStr,
          end: event.endStr
        };
        axios.post(`https://localhost:44325/api/SchMeeting`, data);
        this.read()
      //   axios.get<IValues[]>("https://localhost:44325/api/SchMeeting").then(response => {
      // });
      alert('Meeting Added Sucessfully..!');
      }

      
       renderEventContent(eventContent: EventContentArg) {
        return (
          <div className="fc-event-main">
            <b>{eventContent.timeText}</b>
            <a>&nbsp;&nbsp;</a>
            <i>{eventContent.event.title}</i>
          </div>
        )
      }
     read(){
        fetch("https://localhost:44325/api/SchMeeting")
        .then(Response=>Response.json())
        .then(mydata =>this.setState({val: mydata}))
      }

      
      componentDidMount(){
        fetch("https://localhost:44325/api/SchMeeting")
        .then(Response=>Response.json())
        .then(mydata =>this.setState({val: mydata}))
      }
}
