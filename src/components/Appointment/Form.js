import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
  console.log("props form line 7--->", props);
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const validate = (name, interviewer) => {
    if (name === "") {
      return setError("student name cannot be blank");
    }
    props.onSave(name, interviewer);
    setError("");
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointemnt__card-left">
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
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
