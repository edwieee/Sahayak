import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Shield, RefreshCw, Send, List, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getAllItems } from "@/utils/serviceData";
import { mockApi } from "@/utils/mockApi";

export default function Admin() {
    const [items, setItems] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [summary, setSummary] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        // Basic check: in a real app this would be restricted by role
        setItems(getAllItems());
    }, []);

    const handleUpdate = async () => {
        if (!selectedItem || !summary) {
            toast.error("Please select an item and provide a summary");
            return;
        }

        setIsUpdating(true);
        try {
            const data = await mockApi.admin.updateContent({
                content_id: selectedItem,
                language: "en", // Simplified for demo
                summary: summary
            });

            toast.success(`Update successful! Notified ${data.notified_count} users.`);
            setSummary("");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <AppLayout showBottomNav={false}>
            <div className="container-mobile py-8 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                        <Shield className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Admin Panel</h1>
                        <p className="text-sm text-muted-foreground">Weekly Content Management</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Update Section */}
                    <div className="p-6 bg-card border rounded-3xl shadow-sm space-y-6">
                        <h3 className="font-bold flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-orange-600" /> Push New Update
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Select Content to Update</label>
                                <select
                                    className="w-full h-12 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                                    value={selectedItem}
                                    onChange={(e) => setSelectedItem(e.target.value)}
                                >
                                    <option value="">-- Choose Item --</option>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>{item.title} ({item.category})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Update Summary (Used in notifications)</label>
                                <textarea
                                    className="w-full min-h-[100px] rounded-xl border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
                                    placeholder="e.g., Eligibility criteria updated for 2024. New documents added."
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </div>

                            <Button
                                onClick={handleUpdate}
                                className="w-full h-12 bg-orange-600 hover:bg-orange-700"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Save & Notify Users"}
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="space-y-6">
                        <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-3">
                            <h3 className="font-bold text-blue-900 flex items-center gap-2">
                                <Bell className="h-5 w-5" /> How it works
                            </h3>
                            <ul className="space-y-2 text-sm text-blue-800">
                                <li className="flex gap-2">
                                    <span className="font-bold">1.</span>
                                    <span>Admins verify government updates manually.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">2.</span>
                                    <span>Changes are logged in the central portal.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">3.</span>
                                    <span>Affected users who "Saved" or "Viewed" the topic get an instant alert.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 bg-muted rounded-3xl border space-y-3">
                            <h3 className="font-bold flex items-center gap-2">
                                <List className="h-5 w-5" /> System Statistics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white rounded-xl border text-center">
                                    <p className="text-xl font-bold">100%</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Verified</p>
                                </div>
                                <div className="p-3 bg-white rounded-xl border text-center">
                                    <p className="text-xl font-bold">Local</p>
                                    <p className="text-[10px] text-muted-foreground uppercase">Database</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
