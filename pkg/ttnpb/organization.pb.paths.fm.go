// Code generated by protoc-gen-fieldmask. DO NOT EDIT.

package ttnpb

var OrganizationFieldPathsNested = []string{
	"administrative_contact",
	"administrative_contact.ids",
	"administrative_contact.ids.organization_ids",
	"administrative_contact.ids.organization_ids.organization_id",
	"administrative_contact.ids.user_ids",
	"administrative_contact.ids.user_ids.email",
	"administrative_contact.ids.user_ids.user_id",
	"attributes",
	"contact_info",
	"created_at",
	"deleted_at",
	"description",
	"fanout_notifications",
	"ids",
	"ids.organization_id",
	"name",
	"technical_contact",
	"technical_contact.ids",
	"technical_contact.ids.organization_ids",
	"technical_contact.ids.organization_ids.organization_id",
	"technical_contact.ids.user_ids",
	"technical_contact.ids.user_ids.email",
	"technical_contact.ids.user_ids.user_id",
	"updated_at",
}

var OrganizationFieldPathsTopLevel = []string{
	"administrative_contact",
	"attributes",
	"contact_info",
	"created_at",
	"deleted_at",
	"description",
	"fanout_notifications",
	"ids",
	"name",
	"technical_contact",
	"updated_at",
}
var OrganizationsFieldPathsNested = []string{
	"organizations",
}

var OrganizationsFieldPathsTopLevel = []string{
	"organizations",
}
var GetOrganizationRequestFieldPathsNested = []string{
	"field_mask",
	"organization_ids",
	"organization_ids.organization_id",
}

var GetOrganizationRequestFieldPathsTopLevel = []string{
	"field_mask",
	"organization_ids",
}
var ListOrganizationsRequestFieldPathsNested = []string{
	"collaborator",
	"collaborator.ids",
	"collaborator.ids.organization_ids",
	"collaborator.ids.organization_ids.organization_id",
	"collaborator.ids.user_ids",
	"collaborator.ids.user_ids.email",
	"collaborator.ids.user_ids.user_id",
	"deleted",
	"field_mask",
	"limit",
	"order",
	"page",
}

var ListOrganizationsRequestFieldPathsTopLevel = []string{
	"collaborator",
	"deleted",
	"field_mask",
	"limit",
	"order",
	"page",
}
var CreateOrganizationRequestFieldPathsNested = []string{
	"collaborator",
	"collaborator.ids",
	"collaborator.ids.organization_ids",
	"collaborator.ids.organization_ids.organization_id",
	"collaborator.ids.user_ids",
	"collaborator.ids.user_ids.email",
	"collaborator.ids.user_ids.user_id",
	"organization",
	"organization.administrative_contact",
	"organization.administrative_contact.ids",
	"organization.administrative_contact.ids.organization_ids",
	"organization.administrative_contact.ids.organization_ids.organization_id",
	"organization.administrative_contact.ids.user_ids",
	"organization.administrative_contact.ids.user_ids.email",
	"organization.administrative_contact.ids.user_ids.user_id",
	"organization.attributes",
	"organization.contact_info",
	"organization.created_at",
	"organization.deleted_at",
	"organization.description",
	"organization.fanout_notifications",
	"organization.ids",
	"organization.ids.organization_id",
	"organization.name",
	"organization.technical_contact",
	"organization.technical_contact.ids",
	"organization.technical_contact.ids.organization_ids",
	"organization.technical_contact.ids.organization_ids.organization_id",
	"organization.technical_contact.ids.user_ids",
	"organization.technical_contact.ids.user_ids.email",
	"organization.technical_contact.ids.user_ids.user_id",
	"organization.updated_at",
}

var CreateOrganizationRequestFieldPathsTopLevel = []string{
	"collaborator",
	"organization",
}
var UpdateOrganizationRequestFieldPathsNested = []string{
	"field_mask",
	"organization",
	"organization.administrative_contact",
	"organization.administrative_contact.ids",
	"organization.administrative_contact.ids.organization_ids",
	"organization.administrative_contact.ids.organization_ids.organization_id",
	"organization.administrative_contact.ids.user_ids",
	"organization.administrative_contact.ids.user_ids.email",
	"organization.administrative_contact.ids.user_ids.user_id",
	"organization.attributes",
	"organization.contact_info",
	"organization.created_at",
	"organization.deleted_at",
	"organization.description",
	"organization.fanout_notifications",
	"organization.ids",
	"organization.ids.organization_id",
	"organization.name",
	"organization.technical_contact",
	"organization.technical_contact.ids",
	"organization.technical_contact.ids.organization_ids",
	"organization.technical_contact.ids.organization_ids.organization_id",
	"organization.technical_contact.ids.user_ids",
	"organization.technical_contact.ids.user_ids.email",
	"organization.technical_contact.ids.user_ids.user_id",
	"organization.updated_at",
}

var UpdateOrganizationRequestFieldPathsTopLevel = []string{
	"field_mask",
	"organization",
}
var ListOrganizationAPIKeysRequestFieldPathsNested = []string{
	"limit",
	"order",
	"organization_ids",
	"organization_ids.organization_id",
	"page",
}

var ListOrganizationAPIKeysRequestFieldPathsTopLevel = []string{
	"limit",
	"order",
	"organization_ids",
	"page",
}
var GetOrganizationAPIKeyRequestFieldPathsNested = []string{
	"key_id",
	"organization_ids",
	"organization_ids.organization_id",
}

var GetOrganizationAPIKeyRequestFieldPathsTopLevel = []string{
	"key_id",
	"organization_ids",
}
var CreateOrganizationAPIKeyRequestFieldPathsNested = []string{
	"expires_at",
	"name",
	"organization_ids",
	"organization_ids.organization_id",
	"rights",
}

var CreateOrganizationAPIKeyRequestFieldPathsTopLevel = []string{
	"expires_at",
	"name",
	"organization_ids",
	"rights",
}
var UpdateOrganizationAPIKeyRequestFieldPathsNested = []string{
	"api_key",
	"api_key.created_at",
	"api_key.expires_at",
	"api_key.id",
	"api_key.key",
	"api_key.name",
	"api_key.rights",
	"api_key.updated_at",
	"field_mask",
	"organization_ids",
	"organization_ids.organization_id",
}

var UpdateOrganizationAPIKeyRequestFieldPathsTopLevel = []string{
	"api_key",
	"field_mask",
	"organization_ids",
}
var DeleteOrganizationAPIKeyRequestFieldPathsNested = []string{
	"key_id",
	"organization_ids",
	"organization_ids.organization_id",
}

var DeleteOrganizationAPIKeyRequestFieldPathsTopLevel = []string{
	"key_id",
	"organization_ids",
}
var ListOrganizationCollaboratorsRequestFieldPathsNested = []string{
	"limit",
	"order",
	"organization_ids",
	"organization_ids.organization_id",
	"page",
}

var ListOrganizationCollaboratorsRequestFieldPathsTopLevel = []string{
	"limit",
	"order",
	"organization_ids",
	"page",
}
var GetOrganizationCollaboratorRequestFieldPathsNested = []string{
	"collaborator",
	"collaborator.ids",
	"collaborator.ids.organization_ids",
	"collaborator.ids.organization_ids.organization_id",
	"collaborator.ids.user_ids",
	"collaborator.ids.user_ids.email",
	"collaborator.ids.user_ids.user_id",
	"organization_ids",
	"organization_ids.organization_id",
}

var GetOrganizationCollaboratorRequestFieldPathsTopLevel = []string{
	"collaborator",
	"organization_ids",
}
var SetOrganizationCollaboratorRequestFieldPathsNested = []string{
	"collaborator",
	"collaborator.ids",
	"collaborator.ids.ids",
	"collaborator.ids.ids.organization_ids",
	"collaborator.ids.ids.organization_ids.organization_id",
	"collaborator.ids.ids.user_ids",
	"collaborator.ids.ids.user_ids.email",
	"collaborator.ids.ids.user_ids.user_id",
	"collaborator.rights",
	"organization_ids",
	"organization_ids.organization_id",
}

var SetOrganizationCollaboratorRequestFieldPathsTopLevel = []string{
	"collaborator",
	"organization_ids",
}
var DeleteOrganizationCollaboratorRequestFieldPathsNested = []string{
	"collaborator_ids",
	"collaborator_ids.ids",
	"collaborator_ids.ids.organization_ids",
	"collaborator_ids.ids.organization_ids.organization_id",
	"collaborator_ids.ids.user_ids",
	"collaborator_ids.ids.user_ids.email",
	"collaborator_ids.ids.user_ids.user_id",
	"organization_ids",
	"organization_ids.organization_id",
}

var DeleteOrganizationCollaboratorRequestFieldPathsTopLevel = []string{
	"collaborator_ids",
	"organization_ids",
}
