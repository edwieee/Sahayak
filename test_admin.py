"""Simple test of admin panel"""
import sys
sys.path.insert(0, '.')

from admin_panel import SahayakAdminPanel

print("Testing Sahayak Admin Panel...")
print("=" * 60)

try:
    admin = SahayakAdminPanel()
    print("\n✅ Admin panel initialized successfully!")
    
    print("\n📝 Adding test subscription...")
    admin.add_test_subscription("test_user", "+919999999999", "test-service")
    
    print("\n📝 Creating test update...")
    update_id = admin.create_service_update(
        service_id="test-service",
        service_name="Test Service",
        update_type="test",
        update_message="This is a test update",
        is_critical=True
    )
    
    print(f"\n✅ Update created with ID: {update_id}")
    
    print("\n📝 Triggering notifications...")
    summary = admin.trigger_update_notifications(update_id)
    
    print(f"\n✅ Notifications sent: {summary['sent']}")
    print(f"✅ Total users notified: {summary['total_users']}")
    
    print("\n" + "=" * 60)
    print("✅ ALL TESTS PASSED!")
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
