
import React from "react";
import { Helmet } from "react-helmet-async";
import AccountLayout from "@/components/Layout/AccountLayout";
import useSubscription from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, RefreshCw } from "lucide-react";

const AccountBillingHistory = () => {
  const { billingHistory, isLoading, refetchBillingHistory } = useSubscription();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <AccountLayout>
      <Helmet>
        <title>Billing History | GamePath AI</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Billing History</h1>
            <p className="text-gray-400">View your past invoices and payments</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchBillingHistory()}
            disabled={isLoading}
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin h-8 w-8 border-b-2 border-white rounded-full"></div>
              </div>
            ) : billingHistory && billingHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{formatCurrency(item.amount)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.status === "paid"
                              ? "bg-green-900/30 text-green-400 border border-green-500/30"
                              : item.status === "pending"
                              ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
                              : "bg-red-900/30 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText size={16} className="mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No billing history available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  );
};

export default AccountBillingHistory;
