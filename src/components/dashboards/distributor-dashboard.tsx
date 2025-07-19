import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DistributorDashboard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Distributor Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Welcome, Distributor! Here you can manage your clinics and technicians.</p>
                <p className='text-muted-foreground mt-4'> (Feature in development)</p>
            </CardContent>
        </Card>
    );
}
