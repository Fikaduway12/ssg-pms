from rest_framework import permissions


class IsAdminOrDirector(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.role in ['SUPERADMIN', 'DG', 'DDG'] or request.user.is_superuser
        )


class CanManageUsers(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        
        # Allow if user can manage users
        if hasattr(request.user, 'can_manage_users'):
            return request.user.can_manage_users
        
        return request.user.role in ['SUPERADMIN', 'DG', 'DDG', 'DIVISION_HEAD']
    
    def has_object_permission(self, request, view, obj):
        # Users can view/edit their own profile
        if obj.id == request.user.id:
            return True
        return self.has_permission(request, view)


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id