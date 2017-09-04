/**
 * This Enumerator governs the types of tasks that can be added
 * and represent the quadrant as described here:
 * http://firstround.com/review/practical-frameworks-for-beating-burnout/
 */
var TaskEnum = {
    STRATEGIC: 'strategic',
    HOMERUNS: 'homeruns',
    HOUSEKEEPING: 'housekeeping',
    SHOULDNOTDO: 'shouldnotdo'
};
if (Object.freeze) {
    Object.freeze(TaskEnum);
}

/**
 * This Enumerator governs the type of communication you want to 
 * generate for each task in your quadrant warranting a communication.
 * (You may not need to or want to communicate about a given task).
 * 
 * Inspired by:
 * http://firstround.com/review/practical-frameworks-for-beating-burnout/
 * 
 * IGOTTHIS === This task is important to me; it will be taken care of
 * SORRY === This task I could not accomplish for reason A (now becomes negotiable)
 * ELIMINATED === This task has been eliminated for reasons A, B maybe C. (not negotiable)
 */
var CommunicationTypeEnum = {
    IGOTTHIS: 'igotthis',
    SORRY: 'sorry',
    ELIMINATED: 'eliminated'
};
if (Object.freeze) {
    Object.freeze(CommunicationTypeEnum);
}

module.exports = {
    TaskEnum,
    CommunicationTypeEnum
};