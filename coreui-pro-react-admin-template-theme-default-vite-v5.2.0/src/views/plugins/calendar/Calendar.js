import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // Import Tippy.js styles
import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro';

import { ProBadge } from 'src/components';

export default class Calendar extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
  };

  componentDidMount() {
    this.fetchApprovedConges(); // Fetch approved leaves on component mount
  }

  fetchApprovedConges = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/conges/approved');

      // Define colors for each leave type
      const typeColors = {
        VACANCES: '#4b6f9d', // Green
        MATERNITE: '#517e7a', // Orange
        MALADIE: '#c67e7a', // Red
        URGENCE: '#e89b8b', // Blue
      };

      const approvedConges = response.data.map((conge) => {
        const userName = conge.user ? `${conge.user.nom} ${conge.user.prenom}` : 'Utilisateur inconnu';
        const tooltipInfo = conge.user
          ? `<strong>Email:</strong> ${conge.user.mail}<br/>
             <strong>Poste:</strong> ${conge.user.poste}<br/>
             <strong>Département:</strong> ${conge.user.departement}`
          : 'Informations non trouvées';

        const backgroundColor =
          typeColors[conge.typeConge] || typeColors.DEFAULT; // Assign color based on typeConge

        return {
          id: conge.idConge,
          title: `${conge.typeConge} - ${userName}`, // Include conge type and user name
          start: conge.dateDebut, // Start date of leave
          end: conge.dateFin, // End date of leave
          allDay: true, // Assuming leaves span the whole day
          extendedProps: { tooltip: tooltipInfo }, // Add tooltip info as an extended property
          backgroundColor, // Add background color for event
          borderColor: backgroundColor, // Optional: border color matches background
          textColor: '#fff', // Ensure text is visible
        };
      });

      this.setState({ currentEvents: approvedConges });
    } catch (error) {
      console.error('Error fetching approved leaves:', error);
    }
  };

  handleDayCellClassNames = (args) => {
    const { date } = args;

    // Example logic to change color of weekends (Saturday and Sunday)
    if (date.weekday === 0 || date.weekday === 6) {
      return 'weekend-day'; // Apply custom class for weekends
    }
    return ''; // No custom class for weekdays
  };


  handleEventDidMount = (info) => {
    const tooltipContent = info.event.extendedProps.tooltip;

    if (tooltipContent) {
      tippy(info.el, {
        content: tooltipContent,
        allowHTML: true, // Allow HTML in tooltips
      });
    }
  };

  render() {
    return (
      <CCard className="mb-4">
       {/* <CCardHeader>
          FullCalendar 
        </CCardHeader>*/}
        <CCardBody>
        
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.currentEvents} // Set events dynamically
            eventDidMount={this.handleEventDidMount} // Initialize tooltips here
            dayCellClassNames={this.handleDayCellClassNames} // Add custom class for day cells
          />
        </CCardBody>
      </CCard>
    );
  }
}
