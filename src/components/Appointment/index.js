import React from "react";

// import other Components
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

//import styles
import "./styles.scss";

// Different modes
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

/** renders different components depending on mode*/
const Appointment = (props) => {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  /** Calls the transition fcn to set the mode to SAVING, and then SHOW/ERROR_SAVE depending on bookInterview fcn */
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    //calls bookInterview function with id, new interview component
    bookInterview(id, interview)
      //if successful, calls transition fcn with SHOW and renders SHOW component
      .then(() => {
        transition(SHOW);
      })
      //if unsuccessful, calls transition fcn with 'ERROR_SAVE, true' and renders ERROR component
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  /** Calls the transition fcn to set the mode to DELETE, and then EMPTY/ERROR_DELETE depending on bookInterview fcn */
  const remove = () => {
    transition(DELETE, true);
    // calls cancelInterview fcn with id
    cancelInterview(id)
      //if successful, calls transition fcn with EMPTY and renders EMPTY component
      .then(() => {
        transition(EMPTY);
      })
      //if unsuccessful, calls transition fcn with 'ERROR_DELETE, true' and renders ERROR component
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      {/**if time is a prop, render Header component with time */}
      {time && <Header time={time} />}
      {/**renders Empty component when mode is EMPTY (no appt booked) */}
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {/**renders Show component when mode is SHOW (appt booked) */}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer ? interview.interviewer.name : ""}
          onEdit={() => transition(EDIT)}
          onDelete={() => {
            transition(CONFIRM);
          }}
        />
      )}
      {/**Renders Form component when mode is CREATE (for new appt) or EDIT(for editing existing appt) */}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer ? interview.interviewer.id : ""}
          interviewers={interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {/**renders Status component with appropriate message prop when mode is SAVING/DELETE*/}
      {mode === SAVING && <Status message="Saving!!!" />}
      {mode === DELETE && <Status message="Deleting" />}
      {/**renders Confirm component when mode is CONFIRM(usually prior to deleting appt)*/}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => {
            back();
          }}
          onConfirm={remove}
        />
      )}
      {/**renders Error component with appropriate message prop when mode is ERROR_SAVE/ ERROR_DELETE*/}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment."
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
};

export default Appointment;
