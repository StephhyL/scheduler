import React, { useState } from "react";
//import other Components
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

/**Displays a form with an input to enter student name, list of interviewers to select from, and cancel and save buttons */
const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  /**Set states of student, interviewer, and error to empty string/null respectively*/
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
  };

  /** calls reset, props.onCancel functions to return to previous mode*/
  const cancel = () => {
    reset();
    props.onCancel();
  };

  /**Calls the onSave function only if name of student is present, then sets Error to "" */
  const validate = (name, interviewer) => {
    /**if no name is entered, set Error to an error msg string */
    if (name === "") {
      return setError("student name cannot be blank");
    }
    props.onSave(name, interviewer);
    setError("");
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointemnt__card-left">
        {/*prevents browser from default of refreshing upon submit action */}
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/*input field for user to enter student name*/}
          {/*onChange: sets the student state upon change to input field */}
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            data-testid="student-name-input"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        {/* displays error message when present*/}
        <section className="appointment__validation">{error}</section>
        {/* renders interviewerList component*/}
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/*calls cancel function when 'cancel' button on screen is clicked */}
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          {/*calls validate function when 'save' button on screen is clicked */}
          <Button
            confirm
            onClick={() => {
              validate(student, interviewer);
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
