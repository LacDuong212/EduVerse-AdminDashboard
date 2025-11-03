'use client'; // Thêm dòng này để Next.js biết là client component

import dynamic from 'next/dynamic';
import { Card, CardBody, CardHeader, Col } from 'react-bootstrap';
import { earningChat } from '../data';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Earnings() {
  return (
    <Card className="shadow h-100">
      <CardHeader className="p-4 border-bottom">
        <h5 className="card-header-title">Earnings</h5>
      </CardHeader>
      <CardBody>
        <ReactApexChart
          height={300}
          series={earningChat.series}
          type="area"
          options={earningChat}
        />
      </CardBody>
    </Card>
  );
}
