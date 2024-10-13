<?php

namespace App\Policies;

use App\Models\Enquiry;
use Illuminate\Database\Eloquent\Model as Admin;
use Illuminate\Auth\Access\HandlesAuthorization;

class EnquiryPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     */
    public function before(Admin $admin, $ability)
    {
        if ($admin->is_supper_admin) {
            return true;
        }
    }

    /**
     * Determine whether the admin can view any models.
     */
    public function viewAny(Admin $admin)
    {
        if (is_user()) {
            return true;
        }
        return $admin->can('enquiries:list');
    }

    /**
     * Determine whether the admin can view the model.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $admin
     * @param  \App\Models\Enquiry  $enquiry
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(Admin $admin, Enquiry $enquiry)
    {
        if (is_user()) {
            return $enquiry->email == user()->email;
        }
        return $admin->can('enquiries:view');
    }

    /**
     * Determine whether the admin can create models.
     */
    public function create(Admin $admin)
    {
        if (is_user()) {
            return true;
        }
        return $admin->can('enquiries:new');
    }

    /**
     * Determine whether the admin can update the model.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $admin
     * @param  \App\Models\Enquiry  $enquiry
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(Admin $admin, Enquiry $enquiry)
    {
        if (is_user()) {
            return $enquiry->email == user()->email;
        }
        return $admin->can('enquiries:edit');
    }

    /**
     * Determine whether the admin can delete the model.
     */
    public function delete(Admin $admin)
    {
        return $admin->can('enquiries:delete');
    }

    /**
     * Determine whether the admin can restore the model.
     */
    public function restore(Admin $admin)
    {
        return $admin->can('enquiries:restore');
    }

    /**
     * Determine whether the admin can permanently delete the model.
     */
    public function forceDelete(Admin $admin)
    {
        return $admin->can('enquiries:forceDelete');
    }
}
