
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AccountLayout from "@/components/Layout/AccountLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Download,
  Search,
  Filter,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useSubscription } from "@/hooks/use-subscription";
import { Invoice } from "@/services/subscriptionApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const BillingHistory = () => {
  const navigate = useNavigate();
  const { billingHistory, isLoading, refetchBillingHistory } = useSubscription();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const handleGoBack = () => {
    navigate("/account");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const filteredInvoices = billingHistory.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredInvoices.length);
  const currentInvoices = filteredInvoices.slice(startIndex, endIndex);

  const downloadInvoice = (invoiceId: string) => {
    // In a real implementation, this would call your API to download the invoice
    toast.success(`Downloading invoice ${invoiceId}...`);
  };

  const viewInvoiceDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const resolveFailedPayment = (invoiceId: string) => {
    // In a real implementation, this would redirect to your payment retry flow
    toast.info("Redirecting to payment page...");
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "paid":
        return "bg-cyber-green/20 text-cyber-green";
      case "refunded":
        return "bg-cyber-orange/20 text-cyber-orange";
      case "failed":
        return "bg-cyber-red/20 text-cyber-red";
      case "pending":
        return "bg-cyber-blue/20 text-cyber-blue";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "paid":
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case "refunded":
      case "failed":
      case "pending":
        return <AlertCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <AccountLayout requireSubscription>
      <Helmet>
        <title>Billing History | GamePath AI</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-2"
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Account
          </Button>
          <h1 className="text-2xl font-bold text-white">Billing History</h1>
          <p className="text-gray-400">View and download your invoices</p>
        </div>

        <Card className="border-cyber-blue/30 bg-cyber-darkblue/60">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-cyber-darkblue border-gray-700"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-cyber-darkblue border-gray-700">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-darkblue border-gray-700">
                    <SelectItem value="all">All invoices</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => refetchBillingHistory()}
                  title="Refresh"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center mb-3 md:mb-0">
                      <Skeleton className="h-10 w-10 mr-3 rounded" />
                      <div>
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16 md:ml-6" />
                      <div className="flex gap-2 mt-3 md:mt-0 md:ml-4">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                ))
              ) : filteredInvoices.length > 0 ? (
                currentInvoices.map((invoice) => (
                  <div 
                    key={invoice.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center mb-3 md:mb-0">
                      <div className="mr-3 bg-gray-800 p-2 rounded">
                        <FileText className="h-5 w-5 text-cyber-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{invoice.id}</p>
                        <p className="text-sm text-gray-400 flex items-center">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          {formatDate(invoice.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:ml-4">
                      <Badge className={`${getStatusColor(invoice.status)} self-start md:self-auto flex items-center`}>
                        {getStatusIcon(invoice.status)}
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                      <div className="text-right md:ml-6">
                        <p className="font-mono font-bold">${invoice.amount.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2 mt-3 md:mt-0 md:ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-cyan-400 border-cyan-400/40"
                          onClick={() => viewInvoiceDetails(invoice)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status === "failed" && (
                          <Button
                            variant="cyberAction"
                            size="sm"
                            onClick={() => resolveFailedPayment(invoice.id)}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No invoices found</h3>
                  <p className="text-gray-400">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your filters" 
                      : "You don't have any billing history yet"}
                  </p>
                </div>
              )}
              
              {filteredInvoices.length > 0 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={!!selectedInvoice} onOpenChange={(open) => {
        if (!open) setSelectedInvoice(null);
      }}>
        <DialogContent className="bg-cyber-darkblue border-cyber-blue/30 max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              Invoice {selectedInvoice?.id} - {selectedInvoice && formatDate(selectedInvoice.date)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <Badge className={`${getStatusColor(selectedInvoice.status)} mt-1 flex items-center`}>
                    {getStatusIcon(selectedInvoice.status)}
                    {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="font-mono font-bold text-lg">${selectedInvoice.amount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-4">
                <h4 className="text-sm font-medium mb-2">Items</h4>
                <div className="space-y-2">
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <p>{item.name}</p>
                      <p className="font-mono">${item.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => downloadInvoice(selectedInvoice?.id || "")}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AccountLayout>
  );
};

export default BillingHistory;
