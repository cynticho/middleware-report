import Example from "@/components/Tables/example";

export default function Page() {
  return (
    <div>
      <Example />
    </div>
  );
}

// const table = useMaterialReactTable({
//   columns,
//   data,
//   enableRowActions: true,
//   renderRowActions: ({ row }) => (
//     <Box>
//       <IconButton onClick={() => console.info('Edit')}>
//         <EditIcon />
//       </IconButton>
//       <IconButton onClick={() => console.info('Delete')}>
//         <DeleteIcon />
//       </IconButton>
//     </Box>
//   ),
// });

// return <MaterialReactTable table={table} />;