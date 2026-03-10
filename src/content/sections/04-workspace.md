---
title: "Workspace"
order: 4
---

<h1 id="sec-4">4. Workspace</h1>
<p>This section describes the workspace configuration and conventions.</p>
<p>(To be filled in later.)</p>
<h2 id="sec-4-1">4.1 System Fields Parameters</h2>
<p>Parameters and configuration for system-level fields.</p>
<h3 id="sec-4-1-1">4.1.1 Task Types</h3>
<p>This section explains all task types used in this workspace.</p>
<h4 id="sec-4-1-1-1">4.1.1.1 Task</h4>
<p>The default actionable work-item entry type, representing a unit of work that you intend to do, track to
  completion, and manage through a workflow. A Task has an owner (or owners), a lifecycle state, and often a due
  horizon; you can plan, prioritize, and advance it while keeping context in description, comments, attachments,
  and relationships. As the most operational type—meant for execution rather than just capture—it relies on
  ClickUp's built-in workflow machinery such as <em>Status</em>, <em>Assignment</em>, and <em>Priority</em>.</p>
<h5 id="sec-4-1-1-1-1">4.1.1.1.1 Task Fields</h5>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Nullable</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#row-status">Status</a></td>
        <td>The lifecycle state of the task; statuses are according to the relevant <a href="#sec-4-1-2-2">status group</a>.</td>
        <td>Backlog</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td><a href="#row-priority">Priority</a></td>
        <td>Urgency or importance level of the task.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-assignees">Assignees</a></td>
        <td>The person(s) responsible for doing the task.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-start-date">Start Date</a></td>
        <td>The date from which work can start being done on the task (for whatever constraints apply).</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-due-date">Due Date</a></td>
        <td>The date by which the task must be completed.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-time-estimate">Time Estimate</a></td>
        <td>Estimated effort or duration for the task.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-time-tracked">Time Tracked</a></td>
        <td>Actual time logged on the task.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
    </tbody>
  </table>
</div>
<h5 id="sec-4-1-1-1-2">4.1.1.1.2 Task Constraints</h5>
<p><strong>Status</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Start Date</strong> and <strong>Due Date</strong> are <em>not</em> set.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Status</strong> must be <strong>Backlog</strong>.</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Start Date</strong> and/or <strong>Due Date</strong> are set.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Status</strong> must <em>not</em> be <strong>Backlog</strong>.</span></div>
  </li>
</ul>
<h5 id="sec-4-1-1-1-3">4.1.1.1.3 Task Operational Rules</h5>
<ol class="doc-rules-list" style="list-style: none">
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(1) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Task created</strong> →</span></div>
    <div class="doc-rule-line doc-rule-conditions"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Conditions</span><span class="doc-rule-content">(i) <strong>Start Date</strong> and/or <strong>Due Date</strong> are set.</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) set <strong>Status</strong> to <strong>To Do</strong>.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(2) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Start Date changed</strong> →</span></div>
    <div class="doc-rule-line doc-rule-conditions"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Conditions</span><span class="doc-rule-content">(i) <strong>Start Date</strong> is <em>not</em> set.</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content"><em>and</em></span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(ii) <strong>Due Date</strong> is <em>not</em> set.</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) set <strong>Status</strong> to <strong>Backlog</strong>.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(3) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Start Date changed</strong> →</span></div>
    <div class="doc-rule-line doc-rule-conditions"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Conditions</span><span class="doc-rule-content">(i) <strong>Status</strong> is <strong>Backlog</strong>.</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content"><em>and</em></span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(ii) <span class="doc-rule-group"><span class="doc-rule-group-line"><strong>Start Date</strong> is set</span><span class="doc-rule-group-op">or</span><span class="doc-rule-group-line"><strong>Due Date</strong> is set.</span></span></span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) set <strong>Status</strong> to <strong>To Do</strong>.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(4) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Due Date changed</strong> →</span></div>
    <div class="doc-rule-line doc-rule-conditions"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Conditions</span><span class="doc-rule-content">(i) <strong>Start Date</strong> is <em>not</em> set.</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content"><em>and</em></span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(ii) <strong>Due Date</strong> is <em>not</em> set.</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) set <strong>Status</strong> to <strong>Backlog</strong>.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(5) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Due Date changed</strong> →</span></div>
    <div class="doc-rule-line doc-rule-conditions"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Conditions</span><span class="doc-rule-content">(i) <strong>Status</strong> is <strong>Backlog</strong>.</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content"><em>and</em></span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(ii) <span class="doc-rule-group"><span class="doc-rule-group-line"><strong>Start Date</strong> is set</span><span class="doc-rule-group-op">or</span><span class="doc-rule-group-line"><strong>Due Date</strong> is set.</span></span></span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) set <strong>Status</strong> to <strong>To Do</strong>.</span></div>
  </li>
</ol>
<h4 id="sec-4-1-1-2">4.1.1.2 Event</h4>
<p>An Event represents something that happens at a defined period in time—it has a start and an end, and it is
  about when it occurs and when the user should be made aware of it in advance. Events let you record and track
  occurrences (meetings, deadlines, trips, etc.) and control how far in advance they surface for notification or
  display. The workspace derives precise start and end times from the dates you set, drives <em>Status</em> from
  those times, and computes a <strong>Relevance Date</strong> so the event can be shown or notified ahead of
  time.</p>
<h5 id="sec-4-1-1-2-1">4.1.1.2.1 Event Fields</h5>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Nullable</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#row-status">Status</a></td>
        <td>The lifecycle state of the event. Statuses are according to the relevant <a href="#sec-4-1-2-3">status group</a>.</td>
        <td>Not Scheduled</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
      <tr>
        <td><a href="#row-start-date">Start Date</a></td>
        <td>The date/time when the event starts.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-due-date">Due Date</a></td>
        <td>The date/time when the event ends.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-start-time">Start Time</a></td>
        <td>The precise datetime when the event starts. Used internally.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-end-time">End Time</a></td>
        <td>The precise datetime when the event ends. Used internally.</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-relevance-number">Relevance #</a></td>
        <td>How many units of time in advance the event should start being shown or notified.</td>
        <td>1</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-relevance-unit">Relevance Unit</a></td>
        <td>The unit for that advance period (e.g. days, weeks, months).</td>
        <td>Weeks</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
      <tr>
        <td><a href="#row-relevance-date">Relevance Date</a></td>
        <td>A computed datetime: the date on which this event should start being shown/notified to the user. Calculated as: Start Time minus the relevance period (Relevance # + Relevance Unit).</td>
        <td>—</td>
        <td>Yes</td>
        <td>No</td>
      </tr>
    </tbody>
  </table>
</div>
<p>ClickUp's <strong>Start Date</strong> and <strong>Due Date</strong> default to 4:00 AM on the given day when
  the user does not specify a time—the system treats this 4:00 AM Jerusalem time as "no time set." That default
  is unsuitable for events, so <strong>Start Time</strong> and <strong>End Time</strong> exist as auxiliary
  computational fields: the system populates them from <strong>Start Date</strong> and <strong>Due Date</strong>
  using the rules below, treating any time other than the 4:00 AM default as a real time and using it as-is. The
  user works only with <strong>Start Date</strong> and <strong>Due Date</strong>; <strong>Start Time</strong> and
  <strong>End Time</strong> are not meant to be edited directly.</p>
<h5 id="sec-4-1-1-2-2">4.1.1.2.2 Event Constraints</h5>
<p><strong>Start Time</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Start Date</strong> is <em>not</em> set.</span></div>
    <div class="doc-fc-nested">
      <div class="doc-fc-block">
        <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Due Date</strong> is <em>not</em> set.</span></div>
        <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Start Time</strong> must be empty.</span></div>
      </div>
      <div class="doc-fc-block">
        <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Due Date</strong> is set.</span></div>
        <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Start Time</strong> must be midnight of the Due Date.</span></div>
      </div>
    </div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Start Date</strong> has a real time.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Start Time</strong> must be that time.</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Start Date</strong> is date-only.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Start Time</strong> must be midnight of that day.</span></div>
  </li>
</ul>
<p><strong>End Time</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Due Date</strong> is <em>not</em> set.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>End Time</strong> must be empty.</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Due Date</strong> has a real time.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>End Time</strong> must be that time.</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Due Date</strong> is date-only.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>End Time</strong> must be midnight of the <em>next</em> day.</span></div>
  </li>
</ul>
<p><strong>Relevance Date</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Relevance #</strong> and <strong>Relevance Unit</strong> are set.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Relevance Date</strong> must be <strong>Start Time</strong> minus the relevance period (<strong>Relevance #</strong> × <strong>Relevance Unit</strong>).</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> either is <em>not</em> set.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Relevance Date</strong> must be empty.</span></div>
  </li>
</ul>
<p><strong>Status</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Start Date</strong> and <strong>Due Date</strong> are <em>not</em> set.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Status</strong> must be <strong>Not Scheduled</strong>.</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> <strong>Start Date</strong> and/or <strong>Due Date</strong> are set and current time &lt; <strong>Start Time</strong>.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Status</strong> must be <strong>Upcoming</strong>.</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> current time ≥ <strong>Start Time</strong> and current time ≤ <strong>End Time</strong>.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Status</strong> must be <strong>Occurring</strong>.</span></div>
  </li>
  <li class="doc-fc-block">
    <div class="doc-fc-line doc-fc-if"><span class="doc-fc-keyword"><em>If</em></span><span class="doc-fc-content"> current time &gt; <strong>End Time</strong>.</span></div>
    <div class="doc-fc-line doc-fc-then"><span class="doc-fc-keyword"><em>Then</em></span><span class="doc-fc-content"> <strong>Status</strong> must be <strong>Occurred</strong>.</span></div>
  </li>
</ul>
<h5 id="sec-4-1-1-2-3">4.1.1.2.3 Event Operational Rules</h5>
<ol class="doc-rules-list" style="list-style: none">
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(1) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Event created</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) enforce <strong>Start Time</strong> constraints,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(II) enforce <strong>End Time</strong> constraints,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(III) enforce <strong>Status</strong> constraints,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(IV) enforce <strong>Relevance Date</strong> constraints.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(2) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Start Date changed</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) enforce <strong>Start Time</strong> constraints,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(II) set <strong>Status</strong>,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(III) enforce <strong>Relevance Date</strong> constraints.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(3) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Due Date changed</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) enforce <strong>Start Time</strong> constraints,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(II) enforce <strong>End Time</strong> constraints,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(III) enforce <strong>Status</strong> constraints,</span></div>
    <div class="doc-rule-line"><span class="doc-rule-num"></span><span class="doc-rule-cont"></span><span class="doc-rule-content">(IV) enforce <strong>Relevance Date</strong> constraints.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(4) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>Relevance # / Relevance Unit changed</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) enforce <strong>Relevance Date</strong> constraints.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(5) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>current time &gt; Start Time</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) enforce <strong>Status</strong> constraints.</span></div>
  </li>
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(6) </span><span class="doc-rule-keyword">Trigger</span><span class="doc-rule-content"><strong>current time &gt; End Time</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword">Actions</span><span class="doc-rule-content">(I) enforce <strong>Status</strong> constraints.</span></div>
  </li>
</ol>
<h4 id="sec-4-1-1-3">4.1.1.3 Record</h4>
<p>A Record represents something that is documented—a note, observation, or fact captured for reference. Records
  let you document items with a <strong>Timestamp</strong> so you know when they were recorded (or when the thing
  actually happened, if you backdate). There is no workflow or ownership machinery; the focus is on the content
  and the datetime.</p>
<h5 id="sec-4-1-1-3-1">4.1.1.3.1 Record Fields</h5>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Nullable</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#row-timestamp">Timestamp</a></td>
        <td>The datetime when the record was made (or, if backdated, when the documented thing occurred).</td>
        <td>Current datetime</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
    </tbody>
  </table>
</div>
<h5 id="sec-4-1-1-3-2">4.1.1.3.2 Record Constraints</h5>
<p><strong>Timestamp</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line"><span class="doc-fc-cont"></span><span class="doc-fc-content"><strong>Timestamp</strong> must be set.</span></div>
  </li>
</ul>
<h5 id="sec-4-1-1-3-3">4.1.1.3.3 Record Operational Rules</h5>
<ol class="doc-rules-list" style="list-style: none">
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(1) </span><span class="doc-rule-keyword"><em>on</em></span><span class="doc-rule-content"><strong>Record creation</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword"><em>Then</em></span><span class="doc-rule-content">(I) set <strong>Timestamp</strong> to the current datetime.</span></div>
  </li>
</ol>
<h4 id="sec-4-1-1-4">4.1.1.4 Thought</h4>
<p>A Thought is a <a href="#sec-4-1-1-3">Record</a> that captures a thought—something that crossed your mind and that you want to keep. It might be a realization, an idea, a reminder to do something later, a placeholder for a task you haven't defined yet, a quote or insight worth revisiting, or a half-formed notion you're not ready to turn into anything else. There is no workflow or ownership; you get a <strong>Timestamp</strong> and the content. Structurally it is the same as Record.</p>
<h5 id="sec-4-1-1-4-1">4.1.1.4.1 Thought Fields</h5>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Nullable</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#row-timestamp">Timestamp</a></td>
        <td>The datetime when the thought was recorded (or, if backdated, when the documented thing occurred).</td>
        <td>Current datetime</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
    </tbody>
  </table>
</div>
<h5 id="sec-4-1-1-4-2">4.1.1.4.2 Thought Constraints</h5>
<p><strong>Timestamp</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line"><span class="doc-fc-cont"></span><span class="doc-fc-content"><strong>Timestamp</strong> must be set.</span></div>
  </li>
</ul>
<h5 id="sec-4-1-1-4-3">4.1.1.4.3 Thought Operational Rules</h5>
<ol class="doc-rules-list" style="list-style: none">
  <li>
    <div class="doc-rule-line doc-rule-header"><span class="doc-rule-num">(1) </span><span class="doc-rule-keyword"><em>on</em></span><span class="doc-rule-content"><strong>Thought creation</strong> →</span></div>
    <div class="doc-rule-line doc-rule-then"><span class="doc-rule-num"></span><span class="doc-rule-keyword"><em>Then</em></span><span class="doc-rule-content">(I) set <strong>Timestamp</strong> to the current datetime. The user can change the value afterward.</span></div>
  </li>
</ol>
<h4 id="sec-4-1-1-5">4.1.1.5 Milestone</h4>
<p>A Milestone represents a meaningful date in a project timeline: a point that carries enough importance to stand out as a marker of progress, commitment, completion, approval, transition, or readiness. It is a date with significance—one that helps define where the project is, what has been accomplished, what must happen next, or what moment the work is building toward. A milestone can therefore capture things like a launch moment, a key decision point, a delivery commitment, a phase boundary, or any other notable checkpoint whose value lies in its importance to the project as a whole. It is a temporal anchor that gives structure and meaning to the broader flow of the project.</p>
<h5 id="sec-4-1-1-5-1">4.1.1.5.1 Milestone Fields</h5>
<div class="doc-table-wrap doc-schema-table-wrap">
  <table class="doc-schema-table">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
        <th>Default Value</th>
        <th>Nullable</th>
        <th>Required</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#row-due-date">Due Date</a></td>
        <td>The date by which the milestone is expected to be reached.</td>
        <td>—</td>
        <td>No</td>
        <td>Yes</td>
      </tr>
    </tbody>
  </table>
</div>
<h5 id="sec-4-1-1-5-2">4.1.1.5.2 Milestone Constraints</h5>
<p><strong>Due Date</strong></p>
<ul class="doc-field-comp">
  <li class="doc-fc-block">
    <div class="doc-fc-line"><span class="doc-fc-cont"></span><span class="doc-fc-content"><strong>Due Date</strong> must be set.</span></div>
  </li>
</ul>
<h3 id="sec-4-1-2">4.1.2 Status Groups</h3>
<p>Status Groups are a parameter of ClickUp's base-schema field <em>Status</em> that is set at the Location level
  (i.e., per list/folder/space), designed to model the lifecycle of a particular kind of entry. While a status
  group often ends up feeling like it belongs to a task type, that association is indirect: it's usually true in
  practice, but not guaranteed by ClickUp. In our workspace it becomes especially tight because every list is
  strongly coupled with a task type, so the status group chosen at the location level typically functions as the
  workflow track for that type.</p>
<p>ClickUp forces every status to live inside one of its built-in subgroups—<span class="subgroup">Not started</span>, <span class="subgroup">Active</span>, <span class="subgroup">Done</span>, <span class="subgroup">Closed</span>—even
  when the entry isn't really a "task" in the real-world sense. We still use those subgroups because we have to,
  and we try to map them as sensibly as possible—though for non-task entries it can sometimes feel a bit crooked.
  Whenever we mention a status, we annotate it with its subgroup as a pill.</p>
<h4 id="sec-4-1-2-1">4.1.2.1 Status Transitions and Triggers</h4>
<p>A status change is a <strong>transition</strong>: moving an entry from one lifecycle state to another. In our
  workspace, transitions can be driven by four kinds of triggers:</p>
<ul>
  <li><span class="trigger-type">Manual</span> — The user explicitly changes the status based on judgment calls
    and intangible factors that the workspace can't reliably capture or analyze.</li>
  <li><span class="trigger-type">Internal Conditional</span> — Some change <strong>in the entry</strong> or
    <strong>elsewhere in the workspace</strong> triggers the transition.
  </li>
  <li><span class="trigger-type">External Conditional</span> — A real-world event outside the workspace happens,
    but it's still something that can be pinpointed and articulated specifically.</li>
  <li><span class="trigger-type">Chronological</span> — The passage of time triggers the change: a particular
    date-time boundary is reached.</li>
</ul>
<h4 id="sec-4-1-2-2">4.1.2.2 Task Status Group</h4>
<p>Connected to the task type <strong>Task</strong>, this status group is exclusive to that task type. It
  represents the lifecycle of an actionable work item.</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Backlog <span class="subgroup">Not started</span></strong> — The task exists, but there is no
    intent to work on it yet. it may transition to <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do</strong> <em>if and only if</em> at least one of
    <strong>Start Date</strong> or <strong>Due Date</strong> is set, which acts as the signal that the task is now
    being planned.
  </li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do <span class="subgroup">Not started</span></strong> — The task has a <strong>Start Date
      and/or Due Date</strong> set, so it is now an actual candidate for execution.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>In Progress <span class="subgroup">Active</span></strong> — Work has begun. The move from
    <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do</strong> to <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>In Progress</strong> is <strong>manual</strong>, representing the user
    explicitly declaring that execution started.
  </li>
  <li><span class="status-dot" style="background-color:#dc8084" title="#DC8084" aria-hidden="true"></span><strong>Canceled <span class="subgroup">Done</span></strong> — The task will not be completed. This can
    happen either before work started or mid-execution; the point is that it's intentionally stopped.</li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Complete <span class="subgroup">Closed</span></strong> — The task is finished and successfully
    completed.</li>
</ul>
<h5 id="sec-4-1-2-2-1">4.1.2.2.1 Task Transitions</h5>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Backlog → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when
    <em>at least one</em> of <strong>Start Date</strong> or <strong>Due Date</strong> is set.
  </li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Do → <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress:</strong> <span class="trigger-type">Manual</span> — The user declares that work
    has begun.</li>
  <li><strong>(<span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Backlog, <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress) → <span class="status-dot" style="background-color:#dc8084" title="#DC8084" aria-hidden="true"></span>Canceled:</strong> <span class="trigger-type">Manual</span> — The
    user decides the task will not be completed.</li>
  <li><strong>(<span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Backlog, <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress) → <span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span>Complete:</strong> <span class="trigger-type">Manual</span> — The
    user declares the task has been completed.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>In Progress → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do:</strong> <span class="trigger-type">Manual</span> — Work is paused, typically
    because it's blocked, deprioritized, or waiting on something, but still intended to be resumed.</li>
  <li><strong>(<span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>To Do, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>In Progress) → <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Backlog:</strong> <span class="trigger-type">Internal Conditional</span> —
    Triggered when <strong>Start Date</strong> <em>and</em> <strong>Due Date</strong> are reset to
    <strong>null</strong>.
  </li>
</ul>
<h4 id="sec-4-1-2-3">4.1.2.3 Event Status Group</h4>
<p>Connected to the task type <strong>Event</strong>, this status group represents the lifecycle of an event.</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Not Scheduled <span class="subgroup">Not started</span></strong> — The event exists, but
    <strong>no Start Date and no Due Date</strong> are set.
  </li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>Upcoming <span class="subgroup">Not started</span></strong> — <strong>Start Date and/or Due
      Date</strong> is set. "Upcoming" means the event has been scheduled, and its <strong>Start Time has not
      arrived yet</strong>.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Occurring <span class="subgroup">Active</span></strong> — The current date-time is
    <strong>on/after the event's Start Time</strong> (i.e., the event is happening now or has started and hasn't
    ended yet).
  </li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Occurred <span class="subgroup">Closed</span></strong> — The current date-time is <strong>after
      the event's End Time</strong> (operationally: after the <strong>Due Date/Time</strong>, which we treat as
    the event's end).</li>
</ul>
<h5 id="sec-4-1-2-3-1">4.1.2.3.1 Event Transitions</h5>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Not Scheduled → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>Upcoming:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when at least one of Start Date
    or Due Date is set.</li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>Upcoming → <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>Occurring:</strong> <span class="trigger-type">Chronological</span> — Triggered when the current datetime reaches or passes
    the event's start datetime.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Occurring → <span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span>Occurred:</strong> <span class="trigger-type">Chronological</span> — Triggered when the current datetime reaches or passes
    the event's end datetime (i.e., the Due/End Time).</li>
  <li><strong>(<span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>Upcoming, <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span>Occurring) → <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span>Not Scheduled:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when Start Date and
    Due Date are reset to null.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Occurring → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span>Upcoming:</strong> <span class="trigger-type">Internal Conditional</span> — Triggered when the event's start datetime is
    moved forward to a datetime that has not yet happened.</li>
</ul>
<h4 id="sec-4-1-2-4">4.1.2.4 Shopping Status Group</h4>
<p>Connected to the list <strong>Shopping</strong> in the space <strong>Shopping</strong>, this status group
  models the lifecycle of a purchase intent—from wishlist to receipt or abandonment.</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Idea <span class="subgroup">Not started</span></strong> — On the wishlist; we may buy it
    eventually but are not actively planning to.</li>
  <li><span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Buy <span class="subgroup">Not started</span></strong> — We intend to buy it soon. When making
    an online order or going to the store, this item belongs on the shopping list.</li>
  <li><span class="status-dot" style="background-color:#f76808" title="#F76808" aria-hidden="true"></span><strong>In Cart <span class="subgroup">Active</span></strong> — For online shopping: the product is
    selected and sitting in a site's cart, awaiting checkout.</li>
  <li><span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Ordered <span class="subgroup">Active</span></strong> — An order has been placed; we are waiting
    for delivery.</li>
  <li><span class="status-dot" style="background-color:#dc8084" title="#DC8084" aria-hidden="true"></span><strong>Cancelled <span class="subgroup">Done</span></strong> — The item was in the pipeline at some point
    but will not be purchased; we have no plans to pursue it further.</li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Received <span class="subgroup">Closed</span></strong> — The item has been purchased and received.
  </li>
</ul>
<h5 id="sec-4-1-2-4-1">4.1.2.4.1 Shopping Transitions</h5>
<p>Every transition is <strong>manual</strong>. The usual path is <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Idea</strong> → <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Buy</strong> → <span class="status-dot" style="background-color:#f76808" title="#F76808" aria-hidden="true"></span><strong>In Cart</strong> → <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Ordered</strong> →
    <span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>Received</strong>, but an item may move from any status to any other (e.g. <span class="status-dot" style="background-color:#7a6ae6" title="#7A6AE6" aria-hidden="true"></span><strong>Ordered</strong> back to
  <span class="status-dot" style="background-color:#fff187" title="#FFF187" aria-hidden="true"></span><strong>To Buy</strong> after an order is cancelled, or <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>Idea</strong> to <span class="status-dot" style="background-color:#dc8084" title="#DC8084" aria-hidden="true"></span><strong>Cancelled</strong>).
</p>
<h4 id="sec-4-1-2-5">4.1.2.5 Statusless Status Group</h4>
<p>Status is part of ClickUp's base schema and cannot be removed: every entry must have a status. For lists whose
  entries are not meaningfully characterized by a lifecycle—i.e. they have no real status—we assign this status
  group. ClickUp also requires at least one non-closed status and exactly one closed status per group, so we
  define this minimal, degenerate group with two placeholder statuses:</p>
<ul>
  <li><span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>-- <span class="subgroup">Not started</span></strong> — Represents the absence of a status;
    entries that "have no status" live here.</li>
  <li><span class="status-dot" style="background-color:#30a46c" title="#30A46C" aria-hidden="true"></span><strong>--- <span class="subgroup">Closed</span></strong> — Required by ClickUp as the closed status for
    the group; unused in practice.</li>
</ul>
<p>All entries on a Statusless list remain in <span class="status-dot" style="background-color:#656f7d" title="#656F7D" aria-hidden="true"></span><strong>--</strong> at all times. There are no transitions; no
  status changes are ever made.</p>
<h2 id="sec-4-2">4.2 Custom Fields</h2>
<p>The following fields are custom fields that belong to this workspace. They are the fields we have created and
  attached to locations or other scopes—not ClickUp's built-in system fields—and they appear in our lists and forms
  wherever their scope applies.</p>
<p>Each custom field is built from one of the <a href="#sec-3-2">field types</a> that ClickUp offers. The entries below document our workspace's specific custom fields: their names,
  types, any parameters we use, and how we use them.</p>
<div class="doc-table-wrap">
  <table class="doc-custom-fields-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Field Type</th>
        <th>Description</th>
        <th>Scopes</th>
      </tr>
    </thead>
    <tbody>
      <tr id="row-start-time">
        <td>Start Time</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>The precise date and time when an <a href="#sec-4-1-1-2">event</a> begins.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-end-time">
        <td>End Time</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>The precise date and time when an <a href="#sec-4-1-1-2">event</a> ends.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-relevance-number">
        <td>Relevance #</td>
        <td><a href="#row-ft-number">Number</a></td>
        <td>How many units of time define the <a href="#sec-4-1-1-2">event</a>'s relevance period.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-relevance-unit">
        <td>Relevance Unit</td>
        <td><a href="#row-ft-dropdown">Dropdown</a></td>
        <td>The unit of time that defines the <a href="#sec-4-1-1-2">event</a>'s relevance period.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-relevance-date">
        <td>Relevance Date</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>The date on which this <a href="#sec-4-1-1-2">event</a> should start being shown or notified to the user.</td>
        <td><a href="#sec-4-1-1-2">Event</a></td>
      </tr>
      <tr id="row-timestamp">
        <td>Timestamp</td>
        <td><a href="#row-ft-date">Date</a></td>
        <td>A single datetime, often representing when the documented occurrence happened.</td>
        <td><a href="#sec-4-1-1-3">Record</a>, <a href="#sec-4-1-1-4">Thought</a></td>
      </tr>
    </tbody>
  </table>
</div>
