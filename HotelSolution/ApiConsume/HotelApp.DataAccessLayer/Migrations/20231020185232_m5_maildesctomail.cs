using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelApp.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class m5_maildesctomail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MailDesc",
                table: "Subscribes",
                newName: "Mail");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Mail",
                table: "Subscribes",
                newName: "MailDesc");
        }
    }
}
