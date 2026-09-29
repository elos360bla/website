await db
    .from("varden_pos_state")
    .update({
        active_orders: orders,
        sales_archive: sales
    })
    .eq("id", 1);
