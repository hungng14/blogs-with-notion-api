import AdminLayout from '@/components/layout/Admin'
import { withAuthPage } from '@/middlewares/withAuthPage'
import React from 'react'

const Dashboard = () => {
  return (
    <AdminLayout>Dashboard</AdminLayout>
  )
}

export default Dashboard


export const getServerSideProps = withAuthPage((context) => {
  return {
    props: {},
  };
});
