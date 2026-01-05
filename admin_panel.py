"""
Sahayak Admin Panel - Service Update Management & SMS Notification System
This admin panel allows administrators to:
1. Trigger critical service updates
2. Send SMS notifications to users
3. Manage service information
4. View user activity logs
"""

import json
import sqlite3
from datetime import datetime
from typing import List, Dict, Optional
import os

# SMS Configuration (using Twilio for real SMS)
# For demo purposes, we'll use mock SMS by default
USE_REAL_SMS = False  # Set to True to use real Twilio SMS

if USE_REAL_SMS:
    try:
        from twilio.rest import Client
        # Add your Twilio credentials here
        TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID', 'your_account_sid')
        TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN', 'your_auth_token')
        TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER', '+1234567890')
        twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    except ImportError:
        print("⚠️  Twilio not installed. Install with: pip install twilio")
        USE_REAL_SMS = False


class SahayakAdminPanel:
    def __init__(self, db_path: str = "server/sahayak.db"):
        """Initialize the admin panel with database connection"""
        self.db_path = db_path
        self.init_database()
        
    def init_database(self):
        """Initialize database tables if they don't exist"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create service_updates table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS service_updates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                service_id TEXT NOT NULL,
                service_name TEXT NOT NULL,
                update_type TEXT NOT NULL,
                update_message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_by TEXT DEFAULT 'admin',
                is_critical BOOLEAN DEFAULT 0,
                affected_users INTEGER DEFAULT 0
            )
        """)
        
        # Create sms_notifications table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS sms_notifications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                phone_number TEXT NOT NULL,
                message TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                sent_at TIMESTAMP,
                delivery_status TEXT,
                error_message TEXT,
                update_id INTEGER,
                FOREIGN KEY (update_id) REFERENCES service_updates(id)
            )
        """)
        
        # Create user_subscriptions table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_subscriptions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                phone_number TEXT NOT NULL,
                service_id TEXT NOT NULL,
                subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_active BOOLEAN DEFAULT 1
            )
        """)
        
        conn.commit()
        conn.close()
        print("✅ Database initialized successfully")
    
    def create_service_update(
        self, 
        service_id: str, 
        service_name: str, 
        update_type: str, 
        update_message: str,
        is_critical: bool = False
    ) -> int:
        """
        Create a new service update
        
        Args:
            service_id: Unique identifier for the service
            service_name: Human-readable service name
            update_type: Type of update (timing_change, document_change, eligibility_change, etc.)
            update_message: Detailed update message
            is_critical: Whether this is a critical update requiring immediate notification
            
        Returns:
            update_id: ID of the created update
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO service_updates 
            (service_id, service_name, update_type, update_message, is_critical)
            VALUES (?, ?, ?, ?, ?)
        """, (service_id, service_name, update_type, update_message, is_critical))
        
        update_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        print(f"✅ Service update created: ID {update_id}")
        print(f"   Service: {service_name}")
        print(f"   Type: {update_type}")
        print(f"   Critical: {'Yes' if is_critical else 'No'}")
        
        return update_id
    
    def get_subscribed_users(self, service_id: str) -> List[Dict]:
        """Get all users subscribed to a specific service"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT user_id, phone_number 
            FROM user_subscriptions 
            WHERE service_id = ? AND is_active = 1
        """, (service_id,))
        
        users = [{"user_id": row[0], "phone_number": row[1]} for row in cursor.fetchall()]
        conn.close()
        
        return users
    
    def send_sms_notification(
        self, 
        phone_number: str, 
        message: str, 
        update_id: Optional[int] = None
    ) -> Dict:
        """
        Send SMS notification to a phone number
        
        Args:
            phone_number: Recipient's phone number
            message: SMS message content
            update_id: Optional ID of the related service update
            
        Returns:
            result: Dictionary with status and details
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Insert notification record
        cursor.execute("""
            INSERT INTO sms_notifications 
            (phone_number, message, update_id, status)
            VALUES (?, ?, ?, 'pending')
        """, (phone_number, message, update_id))
        
        notification_id = cursor.lastrowid
        
        result = {
            "notification_id": notification_id,
            "phone_number": phone_number,
            "status": "pending",
            "delivery_status": None,
            "error": None
        }
        
        try:
            if USE_REAL_SMS:
                # Send real SMS via Twilio
                sms = twilio_client.messages.create(
                    body=message,
                    from_=TWILIO_PHONE_NUMBER,
                    to=phone_number
                )
                
                cursor.execute("""
                    UPDATE sms_notifications 
                    SET status = 'sent', sent_at = ?, delivery_status = ?
                    WHERE id = ?
                """, (datetime.now(), sms.status, notification_id))
                
                result["status"] = "sent"
                result["delivery_status"] = sms.status
                print(f"📱 Real SMS sent to {phone_number}")
                
            else:
                # Mock SMS - just log it
                cursor.execute("""
                    UPDATE sms_notifications 
                    SET status = 'sent', sent_at = ?, delivery_status = 'delivered'
                    WHERE id = ?
                """, (datetime.now(), notification_id))
                
                result["status"] = "sent"
                result["delivery_status"] = "delivered (mock)"
                print(f"📱 Mock SMS sent to {phone_number}")
                print(f"   Message: {message[:50]}...")
                
        except Exception as e:
            cursor.execute("""
                UPDATE sms_notifications 
                SET status = 'failed', error_message = ?
                WHERE id = ?
            """, (str(e), notification_id))
            
            result["status"] = "failed"
            result["error"] = str(e)
            print(f"❌ SMS failed to {phone_number}: {e}")
        
        conn.commit()
        conn.close()
        
        return result
    
    def trigger_update_notifications(self, update_id: int) -> Dict:
        """
        Trigger SMS notifications for all subscribed users of an update
        
        Args:
            update_id: ID of the service update
            
        Returns:
            summary: Dictionary with notification statistics
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get update details
        cursor.execute("""
            SELECT service_id, service_name, update_type, update_message, is_critical
            FROM service_updates WHERE id = ?
        """, (update_id,))
        
        update = cursor.fetchone()
        if not update:
            print(f"❌ Update ID {update_id} not found")
            return {"error": "Update not found"}
        
        service_id, service_name, update_type, update_message, is_critical = update
        
        # Get subscribed users
        users = self.get_subscribed_users(service_id)
        
        print(f"\n🔔 Triggering notifications for update #{update_id}")
        print(f"   Service: {service_name}")
        print(f"   Subscribed users: {len(users)}")
        
        # Prepare SMS message
        sms_message = f"SAHAYAK UPDATE: {service_name}\n\n{update_message}\n\nFor details, open Sahayak app."
        
        if is_critical:
            sms_message = f"🚨 CRITICAL " + sms_message
        
        # Send notifications
        sent = 0
        failed = 0
        
        for user in users:
            result = self.send_sms_notification(
                user["phone_number"], 
                sms_message, 
                update_id
            )
            
            if result["status"] == "sent":
                sent += 1
            else:
                failed += 1
        
        # Update affected users count
        cursor.execute("""
            UPDATE service_updates 
            SET affected_users = ?
            WHERE id = ?
        """, (sent, update_id))
        
        conn.commit()
        conn.close()
        
        summary = {
            "update_id": update_id,
            "service_name": service_name,
            "total_users": len(users),
            "sent": sent,
            "failed": failed
        }
        
        print(f"\n✅ Notification Summary:")
        print(f"   Total users: {summary['total_users']}")
        print(f"   Sent: {summary['sent']}")
        print(f"   Failed: {summary['failed']}")
        
        return summary
    
    def add_test_subscription(self, user_id: str, phone_number: str, service_id: str):
        """Add a test user subscription"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO user_subscriptions (user_id, phone_number, service_id)
            VALUES (?, ?, ?)
        """, (user_id, phone_number, service_id))
        
        conn.commit()
        conn.close()
        
        print(f"✅ Test subscription added: {user_id} -> {service_id}")
    
    def view_recent_updates(self, limit: int = 10):
        """View recent service updates"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, service_name, update_type, update_message, 
                   created_at, is_critical, affected_users
            FROM service_updates 
            ORDER BY created_at DESC 
            LIMIT ?
        """, (limit,))
        
        updates = cursor.fetchall()
        conn.close()
        
        print(f"\n📋 Recent Service Updates (Last {limit}):")
        print("=" * 80)
        
        for update in updates:
            update_id, name, type_, msg, created, critical, affected = update
            print(f"\nID: {update_id} | {name}")
            print(f"Type: {type_} | Critical: {'Yes' if critical else 'No'}")
            print(f"Message: {msg[:60]}...")
            print(f"Created: {created} | Affected Users: {affected or 0}")
            print("-" * 80)
    
    def view_sms_log(self, limit: int = 20):
        """View recent SMS notifications"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, phone_number, message, status, sent_at, delivery_status
            FROM sms_notifications 
            ORDER BY id DESC 
            LIMIT ?
        """, (limit,))
        
        notifications = cursor.fetchall()
        conn.close()
        
        print(f"\n📱 Recent SMS Notifications (Last {limit}):")
        print("=" * 80)
        
        for notif in notifications:
            notif_id, phone, msg, status, sent, delivery = notif
            print(f"\nID: {notif_id} | {phone}")
            print(f"Status: {status} | Delivery: {delivery or 'N/A'}")
            print(f"Message: {msg[:60]}...")
            print(f"Sent: {sent or 'Not sent'}")
            print("-" * 80)


def demo_admin_panel():
    """Demonstration of the admin panel capabilities"""
    print("\n" + "=" * 80)
    print("🎛️  SAHAYAK ADMIN PANEL - DEMONSTRATION")
    print("=" * 80)
    
    admin = SahayakAdminPanel()
    
    # Demo 1: Add test subscriptions
    print("\n📝 Step 1: Adding test user subscriptions...")
    admin.add_test_subscription("user_001", "+919876543210", "ayushman-bharat")
    admin.add_test_subscription("user_002", "+919876543211", "ayushman-bharat")
    admin.add_test_subscription("user_003", "+919876543212", "pm-kisan")
    
    # Demo 2: Create a critical service update
    print("\n📝 Step 2: Creating critical service update...")
    update_id = admin.create_service_update(
        service_id="ayushman-bharat",
        service_name="Ayushman Bharat Health Scheme",
        update_type="timing_change",
        update_message="New office hours: Now open on Sundays 9 AM - 2 PM. All centers will remain open on public holidays for emergency registrations.",
        is_critical=True
    )
    
    # Demo 3: Trigger notifications
    print("\n📝 Step 3: Triggering SMS notifications to subscribed users...")
    summary = admin.trigger_update_notifications(update_id)
    
    # Demo 4: Create another update
    print("\n📝 Step 4: Creating document requirement update...")
    update_id_2 = admin.create_service_update(
        service_id="pm-kisan",
        service_name="PM-KISAN Farmer Support",
        update_type="document_change",
        update_message="NEW: Aadhaar linking is now mandatory. Deadline: 31st March. Visit nearest center with Aadhaar card.",
        is_critical=False
    )
    
    admin.trigger_update_notifications(update_id_2)
    
    # Demo 5: View logs
    print("\n📝 Step 5: Viewing activity logs...")
    admin.view_recent_updates(5)
    admin.view_sms_log(10)
    
    print("\n" + "=" * 80)
    print("✅ DEMONSTRATION COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    demo_admin_panel()
