var getFBProfession = function(work_history) {
  var professions = [];
  work_history.forEach(function(job) {
    if (job['position'] && !job['end_date']) {
     professions.push(job['position']['name']);
    };
  });
  return professions.length ? professions.join(', ') : undefined;
}

var getFBEducation = function(education_history) {
  var schools = [];
  education_history.forEach(function(education_event) {
    schools.push(education_event['school']['name']);
   });
  return schools.length ? schools.join(', ') : undefined;
}

var getFBMajors = function(education_history) {
  var majors = [];
  education_history.forEach(function(education_event) {
    if (education_event['concentration']) {
     education_event['concentration'].forEach(function(concentration) {
       majors.push(concentration['name']);
      });
    }
   });
  return majors.length ? majors.join(', ') : undefined;
}
