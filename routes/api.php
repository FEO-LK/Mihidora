<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\CitiesController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\WhatsOnController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\DistrictsController;
use App\Http\Controllers\ClassifiedController;
use App\Http\Controllers\FileuploadController;
use App\Http\Controllers\PageFieldsController;
use App\Http\Controllers\UploadFileController;
use App\Http\Controllers\MembersController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\DataEducationController;
use App\Http\Controllers\OrganizationTypeController;
use App\Http\Controllers\StorageAnalyticsController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\SubmissionAnalyticsController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [LoginController::class, 'authenticate']);
Route::post('forgot-password', [RegisterController::class, 'sendResetPasswordLink']);
Route::post('reset-password', [RegisterController::class, 'resetPassword']);

Route::get('organisation-types', [OrganizationTypeController::class, 'index']);
Route::get('organisations', [OrganizationController::class, 'index']);
Route::get('list-organisations', [OrganizationController::class, 'getOrganizationList']);
Route::get('organisation-map', [OrganizationController::class, 'organizationMap']);
Route::get('organization/{slug}', [OrganizationController::class, 'show']);
Route::get('organization-profile-projects/{org_slug}', [ProjectController::class, 'organizationProfileProjectList']);
Route::get('organization-profile-events/{org_slug}', [WhatsOnController::class, 'organizationProfileEventList']);
Route::get('organization-profile-dataset/{org_slug}', [DataEducationController::class, 'organizationProfileDatasetList']);
Route::get('organization-profile-classified/{org_slug}', [ClassifiedController::class, 'organizationProfileClassifiedList']);
Route::post('organizations-filtered', [OrganizationController::class, 'filterOrganizations']);
Route::get('organization-name/{user_id}', [OrganizationController::class, 'getUserOrganisationsByUserId']);
    
Route::get('projects', [ProjectController::class, 'index']);
Route::post('projects-filtered', [ProjectController::class, 'filterProjects']);
Route::get('project-map', [OrganizationController::class, 'projectMap']);
// Route::get('projects-for-dashboard-dropdowns', [ProjectController::class, 'listProjectsForDashboard']);
Route::get('project-map', [ProjectController::class, 'projectMap']);
Route::get('project/{slug}', [ProjectController::class, 'show']);

Route::get('districts', [DistrictsController::class, 'index']);
Route::get('cities', [CitiesController::class, 'index']);

Route::get('whatson/{slug}', [WhatsOnController::class, 'show']);
Route::get('whatson-events', [WhatsOnController::class, 'ProjectEventsList']);
Route::post('whatson-filtered-events', [WhatsOnController::class, 'filterWhatsOnEvents']);
Route::get('whatson-event-map', [WhatsOnController::class, 'WhatsOnEventsMap']);
Route::get('whatson-media-map', [WhatsOnController::class, 'WhatsOnMediaAndArticlesMap']);
Route::get('whatson-opportunities-map', [WhatsOnController::class, 'WhatsOnOpportunitiesMap']);
Route::get('whatson-media-and-articles', [WhatsOnController::class, 'ProjectMediaAndArticlesList']);
Route::post('whatson-filtered-media-and-advocacy', [WhatsOnController::class, 'filterWhatsOnMediaAndAdvocacy']);
Route::get('whatson-volunteer-opportunities', [WhatsOnController::class, 'ProjectOpportunitiesList']);
Route::post('whatson-filtered-volunteer-opportunities', [WhatsOnController::class, 'filterWhatsOnVolunteerOpportunities']);
Route::get('whatson-events/{slug}', [WhatsOnController::class, 'EventProfile']);
Route::get('whatson-media-and-articles/{slug}', [WhatsOnController::class, 'MediaAndAdvocacyProfile']);
Route::get('whatson-volunteer-opportunities/{slug}', [WhatsOnController::class, 'VolunteerOpportunityProfile']);

Route::get('get-template/{template}', [PageFieldsController::class, 'show']);

Route::get('elearning-list', [DataEducationController::class, 'index']);
Route::get('elearning-list/{slug}', [DataEducationController::class, 'ELearningMaterialProfile']);
Route::post('datahub-filtered', [DataEducationController::class, 'filterDatahub']);
Route::post('elearning-filtered', [DataEducationController::class, 'filterELearningData']);

Route::get('datahub-list', [DataEducationController::class, 'DataList']);
Route::get('datahub-single/{slug}', [DataEducationController::class, 'DataHubItem']);
//Route::get('list-projects/{id}', [ProjectController::class, 'organizationProfileProjectList']); /** PROJECT DONE  */
//Route::post('fileuploader', [ProjectController::class, 'filestore']);

 Route::get('classified-jobs', [ClassifiedController::class, 'ClassifiedsJobList']);
 
 Route::post('classified-jobs-filtered', [ClassifiedController::class, 'filterJobs']);
 Route::post('classified-grants-filtered', [ClassifiedController::class, 'filterGrants']);
 Route::post('classified-suppliers-filtered', [ClassifiedController::class, 'filterSuppliers']);
 Route::post('classified-resources-filtered', [ClassifiedController::class, 'filterResources']);

 Route::get('classified-jobs-map', [ClassifiedController::class, 'ClassifiedsJobsMap']);
 Route::get('classified-proposals-map', [ClassifiedController::class, 'ClassifiedsProposalsMap']);
 Route::get('classified-suppliers-map', [ClassifiedController::class, 'ClassifiedsSuppliersMap']);
 Route::get('classified-resource-sharing-map', [ClassifiedController::class, 'ClassifiedsResourceSharingMap']);
 Route::get('classified-proposals', [ClassifiedController::class, 'ClassifiedsProposalList']);
 Route::get('classified-suppliers', [ClassifiedController::class, 'ClassifiedsSupplierList']);
 Route::get('classified-resource-sharing', [ClassifiedController::class, 'ClassifiedsResourceSharingList']);
 Route::get('resource-exchange-job/{slug}', [ClassifiedController::class, 'JobProfile']);
 Route::get('resource-exchange-proposal/{slug}', [ClassifiedController::class, 'ProposalProfile']);
 Route::get('resource-exchange-supplier/{slug}', [ClassifiedController::class, 'SupplierProfile']);
 Route::get('resource-exchange-resource/{slug}', [ClassifiedController::class, 'ResourceSharingProfile']);
 Route::get('view-members', [MembersController::class, 'index']);
 Route::get('view-file-by-user', [FileuploadController::class, 'index']);
 

//  Tags
Route::post('get-tags', [TagsController::class, 'getLevel1Tags']);
Route::post('add-tag', [TagsController::class, 'addTag']);
Route::post('update-weight', [TagsController::class, 'updateTag']);

Route::post('get-project-tags', [ProjectController::class, 'getProjectTags']);
Route::post('get-projects-by-tag', [TagsController::class, 'getProjects']);
Route::post('add-project-tag', [ProjectController::class, 'addProjectTag']);

Route::post('get-classifieds-by-tags', [TagsController::class, 'getClassifieds']);
Route::post('add-classified-tag', [ClassifiedController::class, 'addTag']);
Route::post('remove-classified-tag', [ClassifiedController::class, 'removeTag']);

Route::post('l3-by-l1', [TagsController::class, 'getL3TagsByL1']);

Route::post('validate-tags', [ProjectController::class, 'validateTags']);
Route::post('filter-topics', [TagsController::class, 'filterTopics']);
Route::post('get-projects', [ProjectController::class, 'getProjects']);

// Notifications
Route::get('send-job-alerts', [NotificationController::class, 'sendJobAlerts']);

Route::get('/storage-link', function () {
    $status = Artisan::call('storage:link');
    return response()->json([
        'status' => 200,
        'message' => $status
    ], 200);
});


Route::middleware(['auth:sanctum', 'isSuperUser'])->group(function() {
//Route::middleware(['auth:sanctum', 'isAdminUser'])->group(function() {    
    Route::get('/user', function () {
        return response()->json([
            'status' => 200,
            'message' => 'You are in'
        ], 200);
    });

    Route::get('view-organisations/{slug}', [OrganizationController::class, 'getUserOrganisations']);
    Route::post('send-user-request', [RequestController::class, 'sendUserRequest']);
    Route::get('check-user-orgs/{slug}', [RequestController::class, 'checkUserOrgs']);

    /** Primary account update */
    Route::get('edit-account/{id}', [UserController::class, 'editAccount']);
    Route::put('update-account/{id}', [UserController::class, 'updateAccount']);

    /** Organization APIs */
    Route::get('edit-organisation/{id}', [OrganizationController::class, 'edit']);
    Route::put('update-organisation/{slug}', [OrganizationController::class, 'update']);
    Route::put('update-org-contact-data/{id}', [OrganizationController::class, 'updateContactData']);
    Route::put('update-staff-profile/{id}', [OrganizationController::class, 'updateStaffProfile']);
    Route::get('all-members', [OrganizationController::class, 'index']);
    //Route::get('delete-organization/{id}', [OrganizationController::class, 'delete']);

    /** File uploades APIs */
    Route::get('view-file-by-user', [FileuploadController::class, 'index']);
    Route::post('fileupload', [FileuploadController::class, 'store']); // photo upload
    Route::post('media-upload', [FileuploadController::class, 'mediastore']); //file upload
    Route::get('view-doc-by-user', [FileuploadController::class, 'getMediaDoc']);

    /** Projects APIs */
    Route::post('store-project', [ProjectController::class, 'store']);
    Route::get('projects-by-organization', [ProjectController::class, 'projectsByOrganization']);
    Route::get('projects-for-dashboard-dropdowns', [ProjectController::class, 'listProjectsForDashboard']);
    Route::get('edit-project/{id}', [ProjectController::class, 'edit']);
    Route::put('update-project/{id}', [ProjectController::class, 'update']);
    Route::get('delete-project/{id}', [ProjectController::class, 'delete']);
    
    /** Dataset/E-learning APIs */
    Route::get('datahub-by-organization', [DataEducationController::class, 'datahubByOrganization']);
    Route::get('elearning-by-organization', [DataEducationController::class, 'elearningByOrganization']);
    Route::post('create-data', [DataEducationController::class, 'storeData']);
    Route::post('create-education', [DataEducationController::class, 'storeEducation']);
    Route::get('edit-data/{id}', [DataEducationController::class, 'editData']);
    Route::get('edit-education/{id}', [DataEducationController::class, 'editEducation']);
    Route::put('update-data/{id}', [DataEducationController::class, 'updateData']);
    Route::put('update-education/{id}', [DataEducationController::class, 'updateEducation']);
    Route::get('delete-data/{id}', [DataEducationController::class, 'delete']);

    /** Whatson APIs [events, media, volunteer ops] */
    Route::get('whatson-by-organization', [WhatsOnController::class, 'whatsonByOrganization']);
    Route::post('store-whatson', [WhatsOnController::class, 'store']);
    Route::get('edit-whatson/{id}', [WhatsOnController::class, 'edit']);
    Route::put('update-whatson/{id}', [WhatsOnController::class, 'update']);
    Route::get('delete-whatson/{id}', [WhatsOnController::class, 'delete']);
    //Route::get('list-whatson-org/{id}', [WhatsOnController::class, 'listWhatsOn']);

    /** Classified */
    Route::post('create-classified', [ClassifiedController::class, 'store']);
    Route::get('list-classifieds/{id}', [ClassifiedController::class, 'getClassifiedByUser']);
    Route::get('edit-classified/{id}', [ClassifiedController::class, 'edit']);
    Route::put('update-classified/{id}', [ClassifiedController::class, 'update']);
    Route::get('delete-classified/{id}', [ClassifiedController::class, 'delete']);

    /** Organization Members */
    Route::get('get-organisation-members', [RequestController::class, 'getOrganisationMembers']);
    Route::get('get-user-request', [RequestController::class, 'checkUserRequest']);
    Route::put('update-member-request/{id}', [RequestController::class, 'updateMemberRequest']);


    /** Super User APIs */
    Route::get('view-users', [UserController::class, 'index']);
    Route::get('view-org-users', [UserController::class, 'getOrgUsers']);
    Route::get('view-pending-users', [UserController::class, 'getPendingOrganizations']);
    Route::get('view-rejected-accounts', [UserController::class, 'getRejectedAccounts']);
    Route::get('new-request', [UserController::class, 'newRequest']);
    Route::get('pending-users', [UserController::class, 'pendingUsers']);
    Route::put('activate-account/{id}', [UserController::class, 'activateAccount']);
    Route::put('deactivate-account/{id}', [UserController::class, 'deactivateAccount']);
    Route::put('update-usercredentials/{id}', [UserController::class, 'updateAccount']);
    Route::post('remove-account', [UserController::class, 'removeUserAccount']);

    Route::post('add-new-member', [MembersController::class, 'store']);
    Route::get('edit-member/{id}', [MembersController::class, 'edit']);
    Route::put('update-member/{id}', [MembersController::class, 'update']);

    Route::get('page-list', [PagesController::class, 'index']);
    Route::get('edit-hopmepage/{page}', [PagesController::class, 'homePageEdit']);
    Route::put('update-homepage/{template}', [PagesController::class, 'homePageUpdate']);
    Route::get('edit-aboutpage/{page}', [PagesController::class, 'aboutPageEdit']);
    Route::put('update-aboutpage/{template}', [PagesController::class, 'aboutPageUpdate']);

    // Analytics
    Route::get('get-user-counts', [AnalyticsController::class, 'getUserCounts']);
    Route::post('get-user-counts-for-days', [AnalyticsController::class, 'getUserCountByDays']);
    Route::post('get-user-counts-for-days-by-week', [AnalyticsController::class, 'getUserCountsByWeeks']);
    Route::post('get-user-counts-for-days-by-month', [AnalyticsController::class, 'getUserCountsByMonthsforNumberofDays']);
    Route::post('get-user-counts-for-months', [AnalyticsController::class, 'getUserCountByMonths']);
    Route::post('get-user-counts-by-weeks', [AnalyticsController::class, 'getUserCountByDateRange']);
    Route::post('get-user-counts-by-months', [AnalyticsController::class, 'getUserCountBreakdownByMonth']);
    Route::post('get-user-counts-by-year', [AnalyticsController::class, 'getUserCountByYear']);

    Route::get('get-submission-counts', [SubmissionAnalyticsController::class, 'getSubmissionCounts']);
    Route::post('get-submission-by-org', [SubmissionAnalyticsController::class, 'submissionsByOrganisations']);
    Route::post('get-submission-by-org-by-week', [SubmissionAnalyticsController::class, 'submissionsByOrganisationsByWeek']);
    Route::post('get-submission-by-org-by-month', [SubmissionAnalyticsController::class, 'submissionsByOrganisationsByMonth']);
    Route::post('get-submission-by-org-by-year', [SubmissionAnalyticsController::class, 'submissionsByOrganisationsByYear']);
    Route::post('get-user-list-by-org', [SubmissionAnalyticsController::class, 'getUserListbyOrganization']);
    Route::post('get-submission-by-user', [SubmissionAnalyticsController::class, 'submissionsByUserByWeek']);

    Route::get('get-storage-by-user', [StorageAnalyticsController::class, 'getUserCounts']);
    Route::get('get-users-files', [StorageAnalyticsController::class, 'returnAllUserswithFiles']);
    Route::get('get-storage-by-org', [StorageAnalyticsController::class, 'getStorageUsageByOrganization']);
    Route::post('get-storage-by-users-by-org', [StorageAnalyticsController::class, 'filterStorageByOrganization']);

    // Subscriptions
    Route::post('subscribe', [SubscriptionController::class, 'subscribe']);
    Route::post('unsubscribe', [SubscriptionController::class, 'unsubscribe']);
    Route::post('get-subscriptions', [SubscriptionController::class, 'getSubscriptions']);

    

});


Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('/logout', [LoginController::class, 'logout']);
});

















// Route::middleware(['auth:sanctum', 'isAdminUser'])->group(function() {
//     Route::get('/admin/user', function () {
//         return response()->json([
//             'status' => 200,
//             'message' => 'You are in'
//         ], 200);
//     });
//     Route::post('/logout', [LoginController::class, 'logout']);
// });


// Route::group(['middleware' => 'auth:sanctum'], function (){
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
// });
